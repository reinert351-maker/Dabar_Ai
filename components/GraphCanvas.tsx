
import React, { useState, useEffect, useRef } from 'react';
import { TeiaNode, TeiaEdge, TeiaNodeType } from '../types';

interface GraphCanvasProps {
  nodes: TeiaNode[];
  edges: TeiaEdge[];
  onNodeClick: (node: TeiaNode) => void;
  theme: 'light' | 'dark' | 'sepia';
}

const GraphCanvas: React.FC<GraphCanvasProps> = ({ nodes, edges, onNodeClick, theme }) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const [localNodes, setLocalNodes] = useState<TeiaNode[]>([]);
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const [isDragging, setIsDragging] = useState<{ id: string, startX: number, startY: number } | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);

  useEffect(() => {
    const existingIds = new Set(localNodes.map(n => n.id));
    const newEntries = nodes
      .filter(n => !existingIds.has(n.id))
      .map(n => ({
        ...n,
        x: n.x ?? 400 + (Math.random() - 0.5) * 500,
        y: n.y ?? 300 + (Math.random() - 0.5) * 400,
        vx: 0,
        vy: 0
      }));
    
    if (newEntries.length > 0) {
      setLocalNodes(prev => [...prev, ...newEntries]);
    }
  }, [nodes]);

  // Motor de Física (Verlet Integration)
  useEffect(() => {
    if (localNodes.length === 0) return;
    
    const interval = setInterval(() => {
      setLocalNodes(prev => {
        const newNodes = prev.map(n => ({ ...n }));
        const k = 0.04;
        const rep = 2000;
        const friction = 0.85;

        newNodes.forEach((n1, i) => {
          if (isDragging?.id === n1.id) return;
          
          let fx = 0, fy = 0;

          // Repulsão
          newNodes.forEach((n2, j) => {
            if (i === j) return;
            const dx = n1.x! - n2.x!;
            const dy = n1.y! - n2.y!;
            const distSq = dx * dx + dy * dy + 1;
            const force = rep / distSq;
            fx += dx * force;
            fy += dy * force;
          });

          // Atração Arestas
          edges.forEach(e => {
            if (e.from === n1.id || e.to === n1.id) {
              const otherId = e.from === n1.id ? e.to : e.from;
              const other = newNodes.find(n => n.id === otherId);
              if (other) {
                fx += (other.x! - n1.x!) * k;
                fy += (other.y! - n1.y!) * k;
              }
            }
          });

          // Gravidade
          fx += (400 - n1.x!) * 0.005;
          fy += (300 - n1.y!) * 0.005;

          n1.vx = (n1.vx || 0 + fx) * friction;
          n1.vy = (n1.vy || 0 + fy) * friction;
          n1.x! += n1.vx;
          n1.y! += n1.vy;
        });
        return newNodes;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [edges, isDragging]);

  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newK = Math.min(Math.max(transform.k * delta, 0.2), 3);
    setTransform(prev => ({ ...prev, k: newK }));
  };

  const handleMouseDown = (e: React.MouseEvent, nodeId?: string) => {
    if (nodeId) {
      setIsDragging({ id: nodeId, startX: e.clientX, startY: e.clientY });
    } else {
      setIsPanning(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && containerRef.current) {
      const CTM = containerRef.current.getScreenCTM();
      if (CTM) {
        const x = (e.clientX - CTM.e) / CTM.a;
        const y = (e.clientY - CTM.f) / CTM.d;
        setLocalNodes(prev => prev.map(n => n.id === isDragging.id ? { ...n, x, y, vx: 0, vy: 0 } : n));
      }
    } else if (isPanning) {
      setTransform(prev => ({ ...prev, x: prev.x + e.movementX, y: prev.y + e.movementY }));
    }
  };

  const getNodeColor = (type: TeiaNodeType) => {
    switch(type) {
      case 'person': return '#f59e0b';
      case 'doctrine': return '#10b981';
      case 'bible_ref': return '#6366f1';
      case 'user_sermon': return '#ec4899';
      case 'theme': return '#4f46e5';
      default: return '#94a3b8';
    }
  };

  return (
    <div className="relative w-full h-[650px] overflow-hidden rounded-[50px] bg-slate-950 shadow-inner border border-slate-800" onWheel={handleWheel}>
      <svg 
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={e => handleMouseDown(e)}
        onMouseMove={handleMouseMove}
        onMouseUp={() => { setIsDragging(null); setIsPanning(false); }}
        onMouseLeave={() => { setIsDragging(null); setIsPanning(false); }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
          {/* Edges */}
          {edges.map(e => {
            const from = localNodes.find(n => n.id === e.from);
            const to = localNodes.find(n => n.id === e.to);
            if (!from || !to) return null;
            const isHovered = hoveredEdge === e.id;
            return (
              <g key={e.id} onMouseEnter={() => setHoveredEdge(e.id)} onMouseLeave={() => setHoveredEdge(null)}>
                <line 
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y} 
                  stroke={isHovered ? '#6366f1' : '#334155'} 
                  strokeWidth={isHovered ? 4 : 1.5} 
                  className="transition-all"
                />
                {isHovered && (
                  <text 
                    x={(from.x! + to.x!) / 2} y={(from.y! + to.y!) / 2} 
                    className="text-[8px] fill-indigo-400 font-black uppercase tracking-widest bg-black"
                  >
                    {e.relationType}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {localNodes.map(n => (
            <g 
              key={n.id} 
              transform={`translate(${n.x},${n.y})`} 
              className="cursor-pointer group"
              onMouseDown={e => { e.stopPropagation(); handleMouseDown(e, n.id); }}
              onClick={() => onNodeClick(n)}
            >
              <circle 
                r={n.id === 'root' ? 35 : 24} 
                fill="#0f172a" 
                stroke={getNodeColor(n.type)} 
                strokeWidth="4" 
                filter={n.score > 80 ? "url(#glow)" : ""}
                className="transition-transform group-hover:scale-110"
              />
              <text 
                y="5" textAnchor="middle" 
                className="text-[8px] font-black fill-white uppercase tracking-tighter pointer-events-none select-none"
              >
                {n.title.substring(0, 10)}
              </text>
              <text 
                y="50" textAnchor="middle" 
                className="text-[9px] font-bold fill-slate-500 uppercase tracking-widest pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {n.title}
              </text>
            </g>
          ))}
        </g>
      </svg>

      <div className="absolute top-6 right-6 flex flex-col gap-2">
         <ControlButton onClick={() => setTransform(prev => ({ ...prev, k: prev.k * 1.2 }))} label="+" />
         <ControlButton onClick={() => setTransform(prev => ({ ...prev, k: prev.k * 0.8 }))} label="-" />
         <ControlButton onClick={() => setTransform({ x: 0, y: 0, k: 1 })} label="⟲" />
      </div>

      <div className="absolute bottom-6 left-6 flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"></div>
            <span className="text-[9px] font-black text-white uppercase">Sincronia Ativa</span>
         </div>
         <span className="text-slate-500 font-mono text-[9px]">{localNodes.length} NÓS • {edges.length} CONEXÕES</span>
      </div>
    </div>
  );
};

const ControlButton = ({ onClick, label }: any) => (
  <button onClick={onClick} className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-white font-black transition-all active:scale-90">
    {label}
  </button>
);

export default GraphCanvas;
