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
  Copy,
  Check,
  Palette,
  MousePointer2,
  Plus,
  LayoutTemplate,
  Code2,
  Undo2,
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Save,
  FolderOpen,
  MousePointer,
  FilePlus,
  Layers,
  Wand2,
  ShieldAlert,
  Zap,
  Layout,
  Command,
  Info
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
  const catFilter = searchParams.get('cat');

  const [themeColor, setThemeColor] = useState('#3b82f6');
  const [canvasBg, setCanvasBg] = useState('#020617');
  const [projectPages, setProjectPages] = useState<Record<string, any>>({
    'Principal': { items: [], type: 'marketing' }
  });
  const [activePage, setActivePage] = useState('Principal');
  const [canvasItems, setCanvasItems] = useState<any[]>([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [projectName, setProjectName] = useState('Mi Proyecto Nexus');
  const [savedProjects, setSavedProjects] = useState<any[]>([]);
  const [showProjectsList, setShowProjectsList] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Modal Wizard State
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardData, setWizardData] = useState({ name: '', type: 'marketing' });

  // Sincronizar canvasItems con projectPages cuando cambia la página activa
  useEffect(() => {
    setCanvasItems(projectPages[activePage]?.items || []);
  }, [activePage]);

  // Cargar proyectos guardados
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('nexus_saved_projects') || '[]');
    setSavedProjects(list);

    const active = localStorage.getItem('nexus_active_project');
    if (active) {
      const proj = JSON.parse(active);
      setProjectName(proj.name);
      setThemeColor(proj.themeColor);
      setCanvasBg(proj.canvasBg || '#020617');

      const hydratedPages: Record<string, any> = {};
      const pagesToHydrate = proj.pages || { 'Principal': { items: proj.items || [], type: 'marketing' } };

      Object.keys(pagesToHydrate).forEach(pageName => {
        const pageData = pagesToHydrate[pageName];
        hydratedPages[pageName] = {
          type: pageData.type || 'marketing',
          items: (pageData.items || []).map((savedItem: any) => {
            const catalogInfo = CATALOG.find(c => c.id === savedItem.id || c.title === savedItem.title);
            return { ...savedItem, render: catalogInfo?.render || (() => null) };
          })
        };
      });

      setProjectPages(hydratedPages);
      setActivePage(Object.keys(hydratedPages)[0] || 'Principal');
    }
  }, []);

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
    const newList = [project, ...savedProjects.filter(p => p.name !== projectName)];
    localStorage.setItem('nexus_saved_projects', JSON.stringify(newList));
    setSavedProjects(newList);
    alert(`Diseño "${projectName}" sincronizado en el Nodo.`);
  }, [projectName, themeColor, canvasBg, projectPages, activePage, canvasItems, savedProjects]);

  // Atajos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveProject]);

  const handleWizardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wizardData.name && !projectPages[wizardData.name]) {
      const newPages = {
        ...projectPages,
        [activePage]: { ...projectPages[activePage], items: canvasItems },
        [wizardData.name]: { items: [], type: wizardData.type }
      };
      setProjectPages(newPages);
      setActivePage(wizardData.name);
      setIsWizardOpen(false);
      setWizardData({ name: '', type: 'marketing' });
    }
  };

  const deletePage = (name: string) => {
    if (Object.keys(projectPages).length > 1) {
      const { [name]: _, ...rest } = projectPages;
      setProjectPages(rest);
      setActivePage(Object.keys(rest)[0]);
    }
  };

  const loadProject = (proj: any) => {
    setProjectName(proj.name);
    setThemeColor(proj.themeColor);
    setCanvasBg(proj.canvasBg || '#020617');

    const hydratedPages: Record<string, any> = {};
    Object.keys(proj.pages).forEach(pageName => {
      const pageData = proj.pages[pageName];
      hydratedPages[pageName] = {
        type: pageData.type,
        items: pageData.items.map((savedItem: any) => {
          const catalogInfo = CATALOG.find(c => c.id === savedItem.id || c.title === savedItem.title);
          return { ...savedItem, render: catalogInfo?.render || (() => null) };
        })
      };
    });

    setProjectPages(hydratedPages);
    setActivePage(Object.keys(hydratedPages)[0]);
    setShowProjectsList(false);
  };

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
    const activeType = projectPages[activePage]?.type;
    const typeMapping: any = {
      'auth': 'login',
      'marketing': 'hero',
      'data': 'table',
      'content': 'form'
    };

    return [...CATALOG].sort((a, b) => {
      const isARecommended = a.type === typeMapping[activeType];
      const isBRecommended = b.type === typeMapping[activeType];
      if (isARecommended && !isBRecommended) return -1;
      if (!isARecommended && isBRecommended) return 1;
      return 0;
    });
  }, [activePage, projectPages]);

  const generateFullCode = () => {
    return `// Proyecto Dinámico Nexus Studio: ${projectName}\n// Las rutas son flexibles para evitar errores de compilación.\n\nimport React from 'react';\nimport { useNavigate } from 'react-router-dom';\n\n${Object.keys(projectPages).map(p => {
      const pData = projectPages[p];
      return `/** \n * Página: ${p}\n * Propósito: ${pData.type}\n */\nexport const Page_${p.replace(/\s+/g, '')} = () => {\n  const navigate = useNavigate();\n  return (\n    <div className="space-y-12 pb-24" style={{ backgroundColor: '${canvasBg}', color: '${themeColor}' }}>\n${pData.items.map((item: any) => `      <${item.title.replace(/\s+/g, '')} />`).join('\n')}\n    </div>\n  );\n};`;
    }).join('\n\n')}\n\n// MAPA DE RUTAS SUGERIDO\n// ${Object.keys(projectPages).map(p => `path: "/${p.toLowerCase().replace(/\s+/g, '-')}"`).join('\n// ')}`;
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
      <div className="relative flex min-h-screen -mt-8 -mx-8 bg-slate-950 overflow-hidden font-sans">

        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={cn(
            "fixed bottom-8 left-8 z-[60] p-4 bg-primary-600 text-white rounded-2xl shadow-2xl transition-all hover:scale-110",
            !isSidebarOpen && "translate-x-0"
          )}
        >
          {isSidebarOpen ? <ChevronLeft size={24}/> : <ChevronRight size={24}/>}
        </button>

        {/* Floating Sidebar (Studio Designer) */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-slate-900 border-r border-slate-800 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-8">
                {/* Header Studio */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-500/10 rounded-xl text-primary-500 border border-primary-500/20"><Sparkles size={20} /></div>
                    <h1 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none text-glow">Nexus Studio</h1>
                  </div>

                  <div className="space-y-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                    <input
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full bg-transparent border-none p-0 text-sm font-black text-white focus:ring-0 placeholder:text-slate-700"
                      placeholder="Nombre del Proyecto..."
                    />
                    <div className="flex gap-2">
                       <button onClick={saveProject} className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary-600 rounded-lg text-[9px] font-black text-white uppercase tracking-widest hover:bg-primary-500 transition-all shadow-lg shadow-primary-900/20"><Save size={12}/> Guardar</button>
                       <button onClick={() => setShowProjectsList(true)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-800 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-all"><FolderOpen size={12}/> Abrir</button>
                    </div>
                  </div>
                </div>

                {/* Canvas Background Selector */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-100 border-b border-slate-800 pb-3">
                    <Wand2 size={14} className="text-primary-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Fondo Artboard</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1.5">
                    {BACKGROUND_PRESETS.map(bg => (
                      <button
                        key={bg.value}
                        onClick={() => setCanvasBg(bg.value)}
                        className={cn(
                          "h-8 rounded-lg border-2 transition-all",
                          canvasBg === bg.value ? "border-white scale-110 shadow-lg" : "border-slate-800 opacity-60 hover:opacity-100"
                        )}
                        style={{ backgroundColor: bg.value }}
                        title={bg.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Pages Manager */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2 text-slate-100">
                      <Layers size={14} className="text-primary-500" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Páginas del Flujo</span>
                    </div>
                    <button onClick={() => setIsWizardOpen(true)} className="p-1.5 bg-primary-500/10 rounded-lg text-primary-400 hover:bg-primary-500 hover:text-white transition-all shadow-inner">
                      <FilePlus size={14} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {Object.keys(projectPages).map(pageName => (
                      <div key={pageName} className="group flex items-center gap-2">
                        <button
                          onClick={() => setActivePage(pageName)}
                          className={cn(
                            "flex-1 text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative overflow-hidden",
                            activePage === pageName
                              ? "bg-primary-600 text-white shadow-xl shadow-primary-900/30"
                              : "bg-slate-950 text-slate-500 hover:text-slate-300 border border-slate-800"
                          )}
                        >
                          <span className="relative z-10">{pageName}</span>
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[7px] opacity-40 font-bold bg-white/10 px-2 py-0.5 rounded-full">
                            {projectPages[pageName].type}
                          </span>
                        </button>
                        {Object.keys(projectPages).length > 1 && (
                          <button onClick={() => { if(confirm(`¿Borrar ${pageName}?`)) deletePage(pageName); }} className="opacity-0 group-hover:opacity-100 p-2 text-slate-600 hover:text-red-500 transition-all"><Trash2 size={14}/></button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Component Library */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-100 border-b border-slate-800 pb-3">
                    <LayoutTemplate size={14} className="text-primary-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Biblioteca {projectPages[activePage]?.type}</span>
                  </div>
                  <div className="space-y-3">
                    {filteredCatalog.map(item => {
                      const isRecommended = item.type === (projectPages[activePage]?.type === 'auth' ? 'login' : projectPages[activePage]?.type === 'data' ? 'table' : '');
                      return (
                        <button
                          key={item.id}
                          onClick={() => addItem(item)}
                          className={cn(
                            "w-full group flex flex-col p-4 bg-slate-950 border rounded-2xl transition-all text-left relative overflow-hidden",
                            isRecommended ? "border-primary-500/50 shadow-lg shadow-primary-500/5" : "border-slate-800 hover:border-slate-600"
                          )}
                        >
                          {isRecommended && (
                            <div className="absolute -top-1 -right-1 bg-primary-600 text-white text-[7px] font-black px-2 py-1 rounded-bl-lg uppercase tracking-tighter animate-pulse z-20">Recomendado</div>
                          )}
                          <div className="flex items-center justify-between relative z-10">
                            <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">{item.title}</span>
                            <Plus size={14} className="text-slate-500 group-hover:text-primary-500" />
                          </div>
                          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1 italic">{item.aisle}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Canvas (Artboard) */}
        <main className={cn(
          "flex-1 relative transition-all duration-500 p-12 overflow-y-auto custom-scrollbar flex flex-col items-center bg-designer-grid",
          isSidebarOpen ? "ml-80" : "ml-0"
        )}>
          {/* Design Toolbar Top */}
          <div className="w-full max-w-5xl flex items-center justify-between bg-slate-900/90 backdrop-blur-xl px-8 py-4 rounded-[2rem] border border-slate-800 shadow-2xl sticky top-0 z-40 mb-12">
             <div className="flex items-center gap-6">
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button onClick={() => setViewMode('desktop')} className={cn("p-2 rounded-lg transition-all", viewMode === 'desktop' ? "bg-primary-600 text-white" : "text-slate-500")} title="Escritorio"><Monitor size={18}/></button>
                  <button onClick={() => setViewMode('mobile')} className={cn("p-2 rounded-lg transition-all", viewMode === 'mobile' ? "bg-primary-600 text-white" : "text-slate-500")} title="Móvil"><Smartphone size={18}/></button>
                </div>
                <div className="h-6 w-px bg-slate-800" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white uppercase italic tracking-tighter leading-none">{projectName}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[8px] font-bold text-primary-500 uppercase tracking-widest">tinyurl.com/JorgeDevops</span>
                    <Command size={10} className="text-slate-600" />
                    <span className="text-[7px] text-slate-600 font-bold uppercase">{activePage} // {projectPages[activePage]?.type}</span>
                  </div>
                </div>
             </div>

             <div className="flex items-center gap-3">
                {/* Global Brand Color Selector */}
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 mr-4">
                   {THEME_COLORS.map(c => (
                     <button key={c.value} onClick={() => setThemeColor(c.value)} className={cn("w-6 h-6 rounded-lg m-1 transition-transform", themeColor === c.value && "scale-110 shadow-lg border border-white")} style={{ backgroundColor: c.value }} />
                   ))}
                </div>
                <Boton variant="secondary" className="py-2 text-[9px] bg-slate-950 border-slate-800 text-slate-500" onClick={() => handleReorder([])}><Undo2 size={14}/> Limpiar</Boton>
                <Boton style={{ backgroundColor: themeColor }} className="py-2 text-[9px] shadow-glow" onClick={handleCopy}>
                  <Code2 size={14}/> EXPORTAR
                </Boton>
             </div>
          </div>

          {/* Design Sheet (The Artboard) */}
          <div
            className={cn(
              "mx-auto rounded-[3.5rem] p-12 shadow-canvas transition-all duration-700 relative border border-white/5",
              viewMode === 'mobile' ? "max-w-[420px]" : "w-full max-w-5xl"
            )}
            style={{ backgroundColor: canvasBg }}
          >
             {/* Artboard Meta */}
             <div className="absolute -top-6 left-12 bg-slate-900 border border-slate-800 px-4 py-1 rounded-t-xl text-[7px] font-black text-slate-500 uppercase tracking-[0.3em]">
               {projectName} / {activePage} / {viewMode.toUpperCase()}
             </div>

             <AnimatePresence mode="popLayout">
               {canvasItems.length === 0 ? (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center py-60 space-y-4">
                    <div className="w-24 h-24 rounded-full border-4 border-dashed border-slate-800 flex items-center justify-center animate-spin-slow">
                      <Plus size={40} className="text-slate-800" />
                    </div>
                    <div className="text-center space-y-2">
                       <p className="text-slate-600 font-black uppercase text-xs tracking-[0.5em]">Artboard Listo</p>
                       <p className="text-[10px] text-slate-800 font-bold uppercase tracking-widest italic">Añade elementos para comenzar el flujo</p>
                    </div>
                 </motion.div>
               ) : (
                 <Reorder.Group axis="y" values={canvasItems} onReorder={handleReorder} className="space-y-12">
                   {canvasItems.map((item) => (
                     <Reorder.Item
                       key={item.instanceId}
                       value={item}
                       className="group relative"
                       initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                       layout
                     >
                       {/* Control Handles */}
                       <div className="absolute -left-16 top-0 bottom-0 w-12 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all justify-center items-center">
                          <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 cursor-grab active:cursor-grabbing shadow-2xl hover:text-primary-500 transition-colors">
                            <MousePointer2 size={18}/>
                          </div>
                          <button onClick={() => removeItem(item.instanceId)} className="p-3 bg-slate-900 border border-red-900/20 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white shadow-2xl transition-all">
                            <Trash2 size={18}/>
                          </button>
                       </div>

                       {/* Component Artboard Wrapper */}
                       <div className="bg-white/5 backdrop-blur-sm rounded-[3rem] p-8 border border-white/5 group-hover:border-primary-500/40 transition-all shadow-2xl relative overflow-hidden">
                          <div className="absolute top-4 right-8 flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                            <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">{item.title}</span>
                            <Info size={10} className="text-slate-500" />
                          </div>
                          <div className="scale-95 origin-top mt-6">
                            {item.render(themeColor)}
                          </div>
                       </div>
                     </Reorder.Item>
                   ))}
                 </Reorder.Group>
               )}
             </AnimatePresence>
          </div>
        </main>

        {/* --- MODAL: NEW PAGE WIZARD --- */}
        <Modal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} title="Inicializar Página de Sistema">
          <form onSubmit={handleWizardSubmit} className="space-y-8">
            <Entrada
              label="Identificador de Página"
              placeholder="ej: Login_Securo, Home_Hero..."
              value={wizardData.name}
              onChange={(e) => setWizardData({...wizardData, name: e.target.value})}
              required autoFocus
            />

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Selecciona el Propósito de la Interfaz</label>
              <div className="grid grid-cols-2 gap-3">
                {PAGE_FUNCTIONS.map(func => (
                  <button
                    key={func.id}
                    type="button"
                    onClick={() => setWizardData({...wizardData, type: func.id})}
                    className={cn(
                      "flex flex-col p-5 rounded-[2rem] border-2 transition-all text-left group",
                      wizardData.type === func.id
                        ? "border-primary-500 bg-primary-500/5 shadow-2xl shadow-primary-900/10 scale-[1.02]"
                        : "border-slate-100 hover:border-primary-200"
                    )}
                  >
                    <div className={cn("p-2 rounded-xl mb-3 inline-flex", wizardData.type === func.id ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-primary-100 group-hover:text-primary-600")}>
                      <func.icon size={20} />
                    </div>
                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">{func.label}</span>
                    <span className="text-[9px] text-slate-500 font-bold leading-tight mt-1">{func.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Boton variant="secondary" type="button" onClick={() => setIsWizardOpen(false)} className="flex-1">Abortar</Boton>
              <Boton type="submit" disabled={!wizardData.name} className="flex-1 shadow-glow" style={{ backgroundColor: themeColor }}>Crear Artboard</Boton>
            </div>
          </form>
        </Modal>

        {/* --- MODAL: SAVED PROJECTS --- */}
        <Modal isOpen={showProjectsList} onClose={() => setShowProjectsList(false)} title="Explorador de Diseños">
          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
            {savedProjects.length === 0 ? (
              <div className="text-center py-20">
                <FolderOpen size={40} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest italic text-xs">No se han detectado diseños guardados.</p>
              </div>
            ) : (
              savedProjects.map((p, i) => (
                <button
                  key={i}
                  onClick={() => loadProject(p)}
                  className="w-full flex items-center justify-between p-6 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] hover:border-primary-500 transition-all text-left group hover:bg-white hover:shadow-2xl"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl shadow-inner border-2 border-white flex items-center justify-center text-white" style={{ backgroundColor: p.themeColor }}>
                      <Command size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 uppercase italic tracking-tighter group-hover:text-primary-600 transition-colors">{p.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest bg-slate-200 px-2 py-0.5 rounded-full">{Object.keys(p.pages).length} Páginas</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{new Date(p.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">
                    <ChevronRight size={20} />
                  </div>
                </button>
              ))
            )}
          </div>
        </Modal>
      </div>
    </DiseñoBase>
  );
};
