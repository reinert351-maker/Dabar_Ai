
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const HOTMART_HOTTOK = "SEU_HOTTOK_AQUI"; // Configure via env vars para produção

exports.hotmartWebhook = functions.https.onRequest(async (req, res) => {
  // 1. Validação de Segurança
  const hottok = req.body.hottok;
  if (hottok !== HOTMART_HOTTOK) {
    console.error("Hottok inválido!");
    return res.status(403).send('Forbidden');
  }

  const event = req.body;
  const transactionId = event.transaction;
  const email = event.email;
  const status = event.status; // 'approved', 'canceled', 'refunded', etc

  try {
    // 2. Idempotência: Verifica se o evento já foi processado
    const eventRef = db.collection('webhook_events').doc(transactionId);
    const existingEvent = await eventRef.get();
    
    if (existingEvent.exists && existingEvent.data().status === status) {
      console.log(`Evento ${transactionId} com status ${status} já processado.`);
      return res.status(200).send('OK');
    }

    // 3. Mapeamento de Direitos (Entitlement)
    let entitlementStatus = 'REVOKED';
    let validUntil = Date.now();

    if (status === 'approved') {
      entitlementStatus = 'ACTIVE';
      // Calcula expiração baseado no plano (mensal ou anual)
      // Exemplo: Soma 32 dias para mensal para dar margem
      validUntil = Date.now() + (32 * 24 * 60 * 60 * 1000); 
    }

    // 4. Persistência Atômica no Firestore
    const batch = db.batch();
    
    // Registra o evento para auditoria
    batch.set(eventRef, { ...event, processedAt: admin.firestore.FieldValue.serverTimestamp() });

    // Atualiza o entitlement do usuário por email
    // Idealmente usar um UID fixo, mas Hotmart envia email
    const userQuery = await db.collection('users').where('email', '==', email).limit(1).get();
    
    if (!userQuery.empty) {
      const userRef = userQuery.docs[0].ref;
      batch.set(db.collection('entitlements').doc(userRef.id), {
        status: entitlementStatus,
        validUntil: validUntil,
        lastCheckedAt: Date.now(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }

    await batch.commit();
    console.log(`Sucesso: Entitlement ${entitlementStatus} para ${email}`);
    
    return res.status(200).send('Webhook Processed');
  } catch (error) {
    console.error("Erro no processamento do webhook:", error);
    return res.status(500).send('Internal Server Error');
  }
});
