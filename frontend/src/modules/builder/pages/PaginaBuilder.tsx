import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { Boton } from '@/components/Boton';
import { Modal } from '@/components/Modal';
import { Entrada } from '@/components/Entrada';
import {
  Sparkles,
  Trash2,
  Code2,
  Undo2,
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Save,
  FolderOpen,
  FilePlus,
  Layers,
  Wand2,
  ShieldAlert,
  Zap,
  Layout,
  Command,
  Presentation,
  Image as ImageIcon,
  Copy,
  Check,
  Terminal,
  Cpu,
  MousePointer2,
  LayoutTemplate,
  Plus
} from 'lucide-react';
import { cn, copyToClipboard } from '@/shared/utils/index';
import { CATALOG } from '../components/BibliotecaComponentes';

const THEME_COLORS = [
  { name: 'Azul Nexus', value: '#3b82f6' },
  { name: 'Índigo Alpha', value: '#6366f1' },
  { name: 'Púrpura Cyber', value: '#a855f7' },
  { name: 'Esmeralda Ops', value: '#10b981' },
  { name: 'Ámbar Alerta', value: '#f59e0b' },
  { name: 'Carmesí Crítico', value: '#ef4444' },
];

const BACKGROUND_PRESETS = [
  { name: 'Original', value: '#020617' },
  { name: 'Pure Dark', value: '#000000' },
  { name: 'Cyber Slate', value: '#0f172a' },
  { name: 'Modern Gray', value: '#1e293b' },
  { name: 'Ghost White', value: '#f8fafc' },
  { name: 'Studio Light', value: '#ffffff' },
];

const PAGE_FUNCTIONS = [
  { id: 'auth', label: 'Autenticación', icon: ShieldAlert, desc: 'Login, Registro, Recuperación' },
  { id: 'marketing', label: 'Marketing', icon: Zap, desc: 'Landing, Héroes, Features' },
  { id: 'data', label: 'Dashboard', icon: Layout, desc: 'Tablas, Métricas, Auditoría' },
  { id: 'content', label: 'Contenido', icon: Layers, desc: 'Documentación, Contacto' },
];

export const PaginaBuilder = () => {
  const [searchParams] = useSearchParams();
  const [themeColor, setThemeColor] = useState('#3b82f6');
  const [canvasBg, setCanvasBg] = useState('#020617');
  const [projectPages, setProjectPages] = useState<Record<string, any>>({
    'Principal': { items: [], type: 'marketing' }
  });
  const [activePage, setActivePage] = useState('Principal');
  const [canvasItems, setCanvasItems] = useState<any[]>([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [projectName, setProjectName] = useState('Mi Proyecto Profesional');
  const [savedProjects, setSavedProjects] = useState<any[]>([]);
  const [showProjectsList, setShowProjectsList] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showDevMode, setShowDevMode] = useState(true);
  const [isCinematicMode, setIsCinematicMode] = useState(false);

  // Modal Wizard State
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardData, setWizardData] = useState({ name: '', type: 'marketing' });

  useEffect(() => {
    setCanvasItems(projectPages[activePage]?.items || []);
  }, [activePage, projectPages]);

  const saveProject = useCallback(() => {
    const updatedPages = { ...projectPages, [activePage]: { ...projectPages[activePage], items: canvasItems } };
    const project = {
      name: projectName,
      themeColor,
      canvasBg,
      pages: Object.keys(updatedPages).reduce((acc: any, key) => {
        acc[key] = {
          type: updatedPages[key].type,
          items: updatedPages[key].items.map(({ render, ...rest }: any) => rest)
        };
        return acc;
      }, {}),
      timestamp: Date.now()
    };
    localStorage.setItem('nexus_active_project', JSON.stringify(project));
    alert(`Proyecto "${projectName}" sincronizado.`);
  }, [projectName, themeColor, canvasBg, projectPages, activePage, canvasItems]);

  const addItem = (item: any) => {
    const newItems = [...canvasItems, { ...item, instanceId: Math.random().toString(36).substr(2, 9) }];
    setCanvasItems(newItems);
    setProjectPages(prev => ({ ...prev, [activePage]: { ...prev[activePage], items: newItems } }));
  };

  const removeItem = (id: string) => {
    const newItems = canvasItems.filter(item => item.instanceId !== id);
    setCanvasItems(newItems);
    setProjectPages(prev => ({ ...prev, [activePage]: { ...prev[activePage], items: newItems } }));
  };

  const handleReorder = (newItems: any[]) => {
    setCanvasItems(newItems);
    setProjectPages(prev => ({ ...prev, [activePage]: { ...prev[activePage], items: newItems } }));
  };

  const filteredCatalog = useMemo(() => {
    const grouped: Record<string, any[]> = {};
    CATALOG.forEach(item => {
      if (!grouped[item.aisle]) grouped[item.aisle] = [];
      grouped[item.aisle].push(item);
    });
    return grouped;
  }, []);

  const generateFullCode = () => {
    return `// Nexus Auto-Generated Module: ${projectName}\nimport React from 'react';\n\n${Object.keys(projectPages).map(p => {
      const pData = projectPages[p];
      return `export const ${p.replace(/\s+/g, '')}Page = () => (\n  <div className="min-h-screen" style={{ backgroundColor: '${canvasBg}' }}>\n    <main className="flex flex-col">\n${pData.items.map((item: any) => `      {/* ${item.title} */}\n      <${item.title.replace(/\s+/g, '')} themeColor="${themeColor}" />`).join('\n')}\n    </main>\n  </div>\n);`;
    }).join('\n\n')}`;
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(generateFullCode());
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <DiseñoBase>
      <div className="relative flex min-h-screen -mt-8 -mx-8 bg-slate-950 font-sans overflow-hidden">

        {/* Sidebar: Engineering Controls */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-slate-900 border-r border-slate-800 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-600 rounded-xl text-white shadow-lg shadow-primary-900/50"><Terminal size={20} /></div>
                  <h1 className="text-xl font-black text-white italic tracking-tighter uppercase">Nexus Engine</h1>
                </div>

                {/* Project Context */}
                <div className="space-y-4">
                  <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <input
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full bg-transparent border-none p-0 text-sm font-black text-white focus:ring-0"
                      placeholder="Project Name..."
                    />
                    <div className="flex gap-2">
                       <button onClick={saveProject} className="flex-1 py-2 bg-primary-600 rounded-lg text-[9px] font-black text-white uppercase tracking-widest hover:bg-primary-500 transition-all">Sincronizar</button>
                       <button onClick={() => setShowProjectsList(true)} className="flex-1 py-2 bg-slate-800 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-all">Abrir</button>
                    </div>
                  </div>
                </div>

                {/* Layer Control */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Páginas del Sistema</span>
                    <button onClick={() => setIsWizardOpen(true)} className="p-1 text-primary-500 hover:scale-110 transition-transform"><FilePlus size={16}/></button>
                  </div>
                  <div className="space-y-2">
                    {Object.keys(projectPages).map(pageName => (
                      <button
                        key={pageName}
                        onClick={() => setActivePage(pageName)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                          activePage === pageName ? "bg-primary-600 text-white shadow-lg" : "bg-slate-950 text-slate-500 hover:text-slate-300 border border-slate-800"
                        )}
                      >
                        {pageName} <span className="opacity-30 text-[8px] float-right">{projectPages[pageName].type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Technical Library */}
                <div className="space-y-6">
                   <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                      <LayoutTemplate size={14} className="text-primary-500" />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Biblioteca de Bloques</span>
                   </div>
                   {Object.entries(filteredCatalog).map(([aisle, items]) => (
                     <div key={aisle} className="space-y-2">
                        <h4 className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">{aisle}</h4>
                        <div className="grid grid-cols-1 gap-2">
                           {items.map(item => (
                             <button
                               key={item.id}
                               onClick={() => addItem(item)}
                               className="w-full flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl hover:border-primary-500/50 hover:bg-primary-500/5 transition-all text-left"
                             >
                                <span className="text-[9px] font-bold text-slate-300 uppercase">{item.title}</span>
                                <Plus size={12} className="text-slate-700" />
                             </button>
                           ))}
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Canvas: Technical Workspace */}
        <main className={cn(
          "flex-1 relative transition-all duration-700 flex flex-col items-center bg-designer-grid overflow-y-auto custom-scrollbar p-12",
          isSidebarOpen ? "ml-80" : "ml-0",
          isCinematicMode && "!ml-0 !p-0"
        )}>

          {/* Top Dev HUD */}
          {!isCinematicMode && (
            <div className="w-full max-w-6xl flex items-center justify-between bg-slate-900/90 backdrop-blur-xl px-8 py-4 rounded-[2rem] border border-slate-800 shadow-2xl sticky top-0 z-40 mb-12">
               <div className="flex items-center gap-6">
                  <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-400 hover:text-white"><ChevronLeft className={cn("transition-transform", !isSidebarOpen && "rotate-180")}/></button>
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button onClick={() => setViewMode('desktop')} className={cn("p-2 rounded-lg", viewMode === 'desktop' ? "bg-primary-600 text-white" : "text-slate-600")}><Monitor size={18}/></button>
                    <button onClick={() => setViewMode('mobile')} className={cn("p-2 rounded-lg", viewMode === 'mobile' ? "bg-primary-600 text-white" : "text-slate-600")}><Smartphone size={18}/></button>
                  </div>
                  <div className="h-6 w-px bg-slate-800" />
                  <button onClick={() => setShowDevMode(!showDevMode)} className={cn("text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border transition-all", showDevMode ? "bg-primary-500/10 border-primary-500 text-primary-500" : "border-slate-800 text-slate-600")}>HUD: {showDevMode ? 'ON' : 'OFF'}</button>
                  <button
                    onClick={() => setIsCinematicMode(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-[9px] font-black text-indigo-400 uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    <Eye size={14} /> Modo Cine
                  </button>
               </div>

               <div className="flex items-center gap-4">
                  <div className="flex gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                     {THEME_COLORS.map(c => (
                       <button key={c.value} onClick={() => setThemeColor(c.value)} className={cn("w-6 h-6 rounded-lg transition-transform", themeColor === c.value && "scale-110 shadow-lg border border-white")} style={{ backgroundColor: c.value }} />
                     ))}
                  </div>
                  <button onClick={handleCopy} className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 rounded-xl text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-lg shadow-primary-900/40 hover:bg-primary-500 transition-all">
                    {copied ? <Check size={14}/> : <Code2 size={14}/>} {copied ? 'COPIADO' : 'EXPORTAR TSX'}
                  </button>
               </div>
            </div>
          )}

          {/* Cinematic Exit Button */}
          {isCinematicMode && (
            <button
              onClick={() => setIsCinematicMode(false)}
              className="fixed top-8 right-8 z-[100] p-4 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:bg-red-600 transition-all shadow-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest"
            >
               <X size={20} /> Salir del Modo Cine
            </button>
          )}

          {/* THE ARTBOARD (Real Scale Canvas) */}
          <div
            className={cn(
              "mx-auto transition-all duration-700 relative bg-white shadow-[0_0_100px_rgba(0,0,0,0.5)]",
              viewMode === 'mobile' ? "w-[420px] min-h-[850px] rounded-[3.5rem] border-[12px] border-slate-900" : "w-full max-w-6xl min-h-[90vh] rounded-[1rem] border-slate-800",
              isCinematicMode && "w-full max-w-none !min-h-screen !rounded-none !border-none"
            )}
            style={{ backgroundColor: canvasBg }}
          >
             {/* Device UI Features */}
             {viewMode === 'mobile' && !isCinematicMode && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-3xl z-50" />}

             <div className="w-full h-full min-h-inherit overflow-y-auto custom-scrollbar relative rounded-[inherit]">
                <AnimatePresence mode="popLayout">
                  {canvasItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center py-60 space-y-8 px-8 text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="p-8 bg-slate-100 rounded-[3rem] text-slate-200 border-2 border-dashed border-slate-300"
                        >
                          <LayoutTemplate size={80} />
                        </motion.div>
                        <div className="space-y-4">
                           <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">Estudio Vacío</h2>
                           <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.3em] max-w-md mx-auto leading-relaxed">
                              Tu lienzo está esperando. Ve al <span className="text-primary-600">Laboratorio</span>, elige tus suministros tácticos y comienza a ensamblar tu visión.
                           </p>
                           <Boton onClick={() => navigate('/laboratorio')} className="mt-6">
                              Ir al Laboratorio <ArrowRight size={16} className="ml-2" />
                           </Boton>
                        </div>
                    </div>
                  ) : (
                    <Reorder.Group axis="y" values={canvasItems} onReorder={handleReorder} className="w-full flex flex-col">
                      {canvasItems.map((item) => (
                        <Reorder.Item
                          key={item.instanceId}
                          value={item}
                          className="group relative w-full"
                          layout
                        >
                          {/* Dev HUD Info */}
                          {showDevMode && (
                            <div className="absolute top-4 left-4 z-40 px-3 py-1 bg-slate-900/80 backdrop-blur text-[8px] font-black text-primary-400 uppercase tracking-widest rounded-lg border border-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
                              Component: {item.title} // ID: {item.instanceId}
                            </div>
                          )}

                          {/* Quick Actions */}
                          <div className="absolute right-4 top-4 z-40 flex gap-2 opacity-0 group-hover:opacity-100 transition-all scale-90 origin-right">
                             <div className="p-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-400 cursor-grab active:cursor-grabbing hover:text-white transition-colors shadow-2xl"><MousePointer2 size={16}/></div>
                             <button onClick={() => removeItem(item.instanceId)} className="p-2 bg-red-600 rounded-xl text-white hover:bg-red-500 shadow-2xl transition-all"><Trash2 size={16}/></button>
                          </div>

                          {/* REAL RENDER */}
                          <div className={cn(
                            "w-full transition-all duration-300",
                            showDevMode ? "group-hover:outline group-hover:outline-2 group-hover:outline-primary-500 group-hover:z-30" : ""
                          )}>
                             {item.render(themeColor)}
                          </div>
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </main>

        {/* Modals & Helpers */}
        <Modal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} title="Nueva Interfaz de Sistema">
           <form onSubmit={(e) => { e.preventDefault(); addItem(CATALOG[0]); setIsWizardOpen(false); }} className="space-y-6">
              <Entrada label="Página Técnica" placeholder="ej: auth_login_v1" required />
              <div className="grid grid-cols-2 gap-3">
                 {PAGE_FUNCTIONS.map(f => (
                   <button key={f.id} type="button" className="flex flex-col p-4 rounded-2xl border-2 border-slate-100 hover:border-primary-500 transition-all text-left">
                      <f.icon size={20} className="text-primary-600 mb-2"/>
                      <span className="text-[10px] font-black text-slate-900 uppercase">{f.label}</span>
                   </button>
                 ))}
              </div>
              <Boton className="w-full">Generar Lienzo</Boton>
           </form>
        </Modal>
      </div>
    </DiseñoBase>
  );
};
