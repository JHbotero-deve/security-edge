import { useState, ReactNode, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { Boton } from '@/components/Boton';
import { Entrada } from '@/components/Entrada';
import { TablaDatos } from '@/components/TablaDatos';
import {
  Code2,
  Layers,
  Cpu,
  Sparkles,
  ShieldCheck,
  MousePointer2,
  FormInput,
  Layout,
  Copy,
  Check,
  Smartphone,
  Monitor,
  Settings2,
  ShoppingCart,
  Boxes,
  Zap,
  Activity,
  History,
  Lock,
  Ghost,
  Pin,
  PinOff,
  Eye,
  EyeOff,
  Maximize2,
  Info,
  Wand2,
  Brush,
  PlayCircle,
  X
} from 'lucide-react';
import { cn, copyToClipboard } from '@/shared/utils/index';
import { EscudoSeguridad } from '../components/EscudoSeguridad';

// --- Nexus Supermarket Engine ---

interface ControlConfig {
  name: string;
  type: 'boolean' | 'select' | 'text';
  options?: string[];
  label: string;
}

interface LabStyles {
  borders: 'normal' | 'thick' | 'none';
  background: 'dark' | 'glass' | 'high-contrast';
}

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  preview: (props: any) => ReactNode;
  code: (props: any) => string;
  controls: ControlConfig[];
  aisle: string;
  type: string;
  labStyles: LabStyles;
  isPinned: boolean;
  onTogglePin: () => void;
  onTeachMe?: () => void;
}

const ProductCard = ({
  id,
  title,
  description,
  preview,
  code,
  controls,
  aisle,
  type,
  labStyles,
  isPinned,
  onTogglePin,
  onTeachMe
}: ProductCardProps) => {
  const navigate = useNavigate();
  const [props, setProps] = useState<any>(
    controls.reduce((acc, c) => ({
      ...acc,
      [c.name]: c.type === 'boolean' ? false : (c.type === 'select' ? c.options?.[0] : '')
    }), {})
  );
  const [showCode, setShowCode] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code(props));
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddToProject = () => {
    // Guardar en localStorage para que el Builder lo lea
    const currentProject = JSON.parse(localStorage.getItem('nexus_project_canvas') || '[]');
    const newItem = {
      id: `prod-${id}-${Date.now()}`,
      title,
      type,
      aisle,
      instanceId: Math.random().toString(36).substr(2, 9)
    };
    localStorage.setItem('nexus_project_canvas', JSON.stringify([...currentProject, newItem]));

    // Notificación rápida
    console.log('Componente añadido');

    // Redirigir al Builder
    navigate('/builder');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl hover:border-primary-500/50 transition-all duration-500"
    >
      {/* Product Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 rounded-xl shadow-inner text-primary-500 border border-slate-800">
            <Boxes size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-full uppercase tracking-widest border border-primary-500/20">{aisle}</span>
              <h3 className="text-slate-100 font-black text-sm uppercase tracking-tighter italic">{title}</h3>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">{description}</p>
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onTeachMe}
            className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-500/10 transition-all"
            title="¿Cómo usar este componente?"
          >
            <Sparkles size={14}/>
          </button>
          <button
            onClick={onTogglePin}
            className={cn(
              "p-1.5 rounded-lg transition-all",
              isPinned ? "bg-emerald-600 text-white" : "text-slate-400 hover:bg-slate-100"
            )}
            title={isPinned ? "Quitar del Canvas" : "Fijar al Canvas"}
          >
            {isPinned ? <PinOff size={14}/> : <Pin size={14}/>}
          </button>
          <button onClick={() => setViewMode('desktop')} className={cn("p-1.5 rounded-lg transition-all", viewMode === 'desktop' ? "bg-primary-600 text-white" : "text-slate-400 hover:bg-slate-100")}><Monitor size={14}/></button>
          <button onClick={() => setViewMode('mobile')} className={cn("p-1.5 rounded-lg transition-all", viewMode === 'mobile' ? "bg-primary-600 text-white" : "text-slate-400 hover:bg-slate-100")}><Smartphone size={14}/></button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[400px]">
        {/* Preview / Code Display */}
        <div className={cn(
          "flex-1 p-6 flex flex-col items-center justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800 transition-colors duration-500",
          labStyles.background === 'dark' ? "bg-slate-950" :
          labStyles.background === 'glass' ? "bg-gradient-to-br from-primary-900/20 to-slate-950" :
          "bg-white"
        )}>
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 0)', backgroundSize: '24px 24px' }} />

           <div className={cn(
             "transition-all duration-500 flex items-center justify-center p-8 relative overflow-hidden",
             viewMode === 'mobile' ? "w-[280px] h-[350px]" : "w-full h-full max-h-[350px]",
             // Lab Border Styles
             labStyles.borders === 'normal' && "bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl",
             labStyles.borders === 'thick' && "bg-slate-900 rounded-[2.5rem] border-4 border-primary-500/50 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]",
             labStyles.borders === 'none' && "bg-transparent p-0"
           )}>
             <AnimatePresence mode="wait">
               {showCode ? (
                 <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full relative group/code">
                   <pre className="w-full h-full bg-slate-950 text-emerald-400 p-5 rounded-2xl text-[10px] font-mono overflow-auto custom-scrollbar leading-relaxed border border-slate-800">
                     <code>{code(props)}</code>
                   </pre>
                   <button onClick={handleCopy} className="absolute top-3 right-3 p-2 bg-primary-600 hover:bg-primary-700 rounded-xl text-white transition-all shadow-lg shadow-primary-500/20 border border-primary-400/30">
                     {copied ? <Check size={14} className="text-white"/> : <Copy size={14}/>}
                   </button>
                 </motion.div>
               ) : (
                 <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex justify-center scale-110">
                   {preview(props)}
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
        </div>

        {/* Configuration Panel */}
        <div className="w-full lg:w-64 p-5 space-y-5 bg-slate-900 overflow-y-auto">
          <div className="flex items-center gap-2 text-slate-100 border-b border-slate-800 pb-3">
            <Settings2 size={14} className="text-primary-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Configurador</span>
          </div>

          {controls.map((control) => (
            <div key={control.name} className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{control.label}</label>
              {control.type === 'boolean' ? (
                <button
                  onClick={() => setProps({ ...props, [control.name]: !props[control.name] })}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all text-xs font-bold",
                    props[control.name] ? "border-primary-500 bg-primary-500/10 text-primary-400" : "border-slate-800 bg-slate-950 text-slate-500"
                  )}
                >
                  {props[control.name] ? 'Activo' : 'Inactivo'}
                  <div className={cn("w-3 h-3 rounded-full shadow-sm", props[control.name] ? "bg-primary-500" : "bg-slate-700")} />
                </button>
              ) : control.type === 'select' ? (
                <div className="grid grid-cols-2 gap-1.5">
                  {control.options?.map((opt: string) => (
                    <button
                      key={opt}
                      onClick={() => setProps({ ...props, [control.name]: opt })}
                      className={cn(
                        "text-[9px] font-black p-2 rounded-lg border transition-all uppercase truncate",
                        props[control.name] === opt ? "border-primary-500 bg-primary-500 text-slate-900" : "border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-700"
                      )}
                      title={opt}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={props[control.name]}
                  onChange={(e) => setProps({ ...props, [control.name]: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Personalizar..."
                />
              )}
            </div>
          ))}

          <div className="pt-4 space-y-2">
             <Boton
               onClick={() => setShowCode(!showCode)}
               variant="secondary"
               className="w-full text-[10px] py-2 rounded-xl border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
             >
               {showCode ? <Layout size={12} className="mr-2"/> : <Code2 size={12} className="mr-2"/>}
               {showCode ? 'PREVIEW PRODUCTO' : 'OBTENER CÓDIGO'}
             </Boton>
             <button
               onClick={handleAddToProject}
               className="w-full py-2 bg-primary-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/20"
             >
                <ShoppingCart size={10} /> Añadir a mi Proyecto
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface Product {
  id: number;
  aisle: string;
  type: string;
  title: string;
  description: string;
  preview: (props: any) => ReactNode;
  code: (props: any) => string;
  controls: ControlConfig[];
}

// --- Dynamic Components for Preview ---

const LoginFormDinamico = ({ loading }: { loading: boolean }) => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  const estaActivo = usuario.length > 0 || clave.length > 0;

  return (
    <div className="w-full max-w-xs mx-auto space-y-4 p-6 md:p-8 bg-white border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl">
       <div className="text-center space-y-1 mb-6">
          <h4 className="text-slate-900 font-black text-lg italic uppercase tracking-tighter">Acceso Privado</h4>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest px-2">Ingrese credenciales de seguridad</p>
       </div>
       <Entrada
         label="Usuario"
         placeholder="admin@nexus.io"
         value={usuario}
         onChange={(e) => setUsuario(e.target.value)}
       />
       <Entrada
         label="Clave"
         type="password"
         placeholder="••••••••"
         value={clave}
         onChange={(e) => setClave(e.target.value)}
       />
       <Boton
         className={cn(
           "w-full mt-4 transition-all duration-500",
           estaActivo ? "bg-primary-600 shadow-primary-500/40" : "bg-slate-200 text-slate-400 shadow-none hover:bg-slate-300"
         )}
         isLoading={loading}
       >
         {estaActivo ? 'ENTRAR AL NODO' : 'ESPERANDO DATOS...'}
       </Boton>
    </div>
  );
};

export const PaginaLaboratorio = () => {
  const [activeAisle, setActiveAisle] = useState('all');
  const [isDesignerMode, setIsDesignerMode] = useState(false);
  const [showAisleGuide, setShowAisleGuide] = useState<string | null>(null);
  const [teachingComponent, setTeachingComponent] = useState<number | null>(null);
  const [showShowroom, setShowShowroom] = useState<string | null>(null);

  // Persistencia de Estilos del Lab: DEFAULT TO GLASS/LIGHT
  const [labStyles, setLabStyles] = useState<LabStyles>(() => {
    const saved = localStorage.getItem('nexus_lab_styles');
    return saved ? JSON.parse(saved) : { borders: 'normal', background: 'glass' };
  });

  // Persistencia de Pins (Canvas)
  const [pinnedIds, setPinnedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('nexus_lab_pins');
    return saved ? JSON.parse(saved) : [];
  });

  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    localStorage.setItem('nexus_lab_styles', JSON.stringify(labStyles));
  }, [labStyles]);

  useEffect(() => {
    localStorage.setItem('nexus_lab_pins', JSON.stringify(pinnedIds));
  }, [pinnedIds]);

  const togglePin = (id: number) => {
    setPinnedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const aisles = [
    { id: 'all', label: 'Todo el Stock', icon: Layout, desc: 'Catálogo completo de suministros digitales.', imagination: 'Combina diferentes pasillos para crear algo nunca antes visto.' },
    { id: 'UI', label: 'Pasillo 1: Interacción', icon: MousePointer2, desc: 'Botones, disparadores y elementos de acción inmediata.', tips: 'Usa estos para feedback háptico.', imagination: '¿Cómo se vería un botón que controla una red neuronal?' },
    { id: 'Forms', label: 'Pasillo 2: Captura Datos', icon: FormInput, desc: 'Entradas de texto, selectores y validación de campo.', tips: 'Ideal para registros y búsquedas.', imagination: 'Diseña un formulario que parezca una terminal de descifrado.' },
    { id: 'Sec', label: 'Pasillo 3: Seguridad', icon: Lock, desc: 'Módulos de autenticación, escudos y cifrado.', tips: 'Protección de capa final activa.', imagination: 'Imagina una entrada a un nodo ultra-secreto en el borde de la red.' },
    { id: 'Data', label: 'Pasillo 4: Analíticas', icon: Activity, desc: 'Tablas pro, gráficos y visualización de nodos.', tips: 'Optimizado para Big Data.', imagination: 'Visualiza el flujo de datos de toda una ciudad en una sola tabla.' },
    { id: 'Layouts', label: 'Pasillo 5: Estructuras', icon: Boxes, desc: 'Headers, Footers y contenedores maestros.', tips: 'El esqueleto de tu proyecto.', imagination: 'Define el horizonte visual de tu próxima gran aplicación.' },
  ];

  const products: Product[] = [
    {
      id: 1,
      aisle: 'UI',
      type: 'button',
      title: 'Botón Nexus Ultra',
      description: 'Accionador con feedback háptico visual y estados dinámicos.',
      preview: (p: any) => <Boton variant={p.variant} isLoading={p.loading} disabled={p.disabled}>{p.text || 'BOTÓN'}</Boton>,
      code: (p: any) => `<Boton variant="${p.variant}" ${p.loading ? 'isLoading ' : ''}${p.disabled ? 'disabled ' : ''}>\n  ${p.text || 'BOTÓN'}\n</Boton>`,
      controls: [
        { name: 'text', type: 'text', label: 'Texto del Botón' },
        { name: 'variant', type: 'select', label: 'Variante', options: ['primary', 'secondary', 'danger'] },
        { name: 'loading', type: 'boolean', label: 'Cargando' },
        { name: 'disabled', type: 'boolean', label: 'Bloqueado' }
      ]
    },
    {
      id: 2,
      aisle: 'Forms',
      type: 'form',
      title: 'Nexus Input v2',
      description: 'Entrada de datos con validación flotante y enfoque suave.',
      preview: (p: any) => <Entrada label={p.label} placeholder={p.placeholder} error={p.error} className="w-full max-w-sm" />,
      code: (p: any) => `<Entrada \n  ${p.label ? `label="${p.label}" ` : ''}\n  ${p.error ? `error="${p.error}" ` : ''}\n  placeholder="${p.placeholder}" \n/>`,
      controls: [
        { name: 'label', type: 'text', label: 'Etiqueta' },
        { name: 'placeholder', type: 'text', label: 'Marcador' },
        { name: 'error', type: 'text', label: 'Mensaje Error' }
      ]
    },
    {
      id: 4,
      aisle: 'Data',
      type: 'table',
      title: 'Tabla Inventario Pro',
      description: 'Tabla de alta disponibilidad con renderizado dinámico y estados de carga.',
      preview: (p: any) => (
        <div className="w-full max-w-lg bg-white p-4 rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          <TablaDatos
            columns={[
              { header: 'Recurso', key: 'id' },
              { header: 'Servicio', key: 'name' },
              {
                header: 'Estado',
                key: 'status',
                render: (item: any) => (
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                    item.status === 'ACTIVE' ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                  )}>
                    {item.status}
                  </span>
                )
              }
            ]}
            data={p.showData ? [
              { id: 'NX-01', name: 'Auth Module', status: 'ACTIVE' },
              { id: 'NX-02', name: 'Crypto Core', status: 'ACTIVE' },
              { id: 'NX-03', name: 'Log Stream', status: 'INACTIVE' },
            ] : []}
            isLoading={p.loading}
            emptyMessage="Pasillo de datos vacío"
          />
        </div>
      ),
      code: (p: any) => `<TablaDatos ... />`,
      controls: [
        { name: 'loading', type: 'boolean', label: 'Simular Carga' },
        { name: 'showData', type: 'boolean', label: 'Mostrar Datos' }
      ]
    },
    {
      id: 6,
      aisle: 'Sec',
      type: 'login',
      title: 'Login Nexus Auth',
      description: 'Estructura de formulario de acceso seguro con feedback dinámico.',
      preview: (p: any) => <LoginFormDinamico loading={p.loading} />,
      code: (p: any) => `<form className="space-y-4">\n  <Entrada label="Usuario" />\n  <Entrada label="Clave" type="password" />\n  <Boton className={hasData ? 'bg-primary-600' : 'bg-slate-200'}>\n    ENTRAR\n  </Boton>\n</form>`,
      controls: [
        { name: 'loading', type: 'boolean', label: 'Simular Login' }
      ]
    },
    {
      id: 7,
      aisle: 'Layout',
      type: 'header',
      title: 'Encabezado Completo',
      description: 'Barra de herramientas superior con navegación y notificaciones.',
      preview: (p: any) => (
        <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-lg">
           <div className="flex items-center gap-3">
              <div className="bg-primary-600 p-1.5 rounded-lg text-white"><ShieldCheck size={16}/></div>
              <span className="font-black text-slate-900 tracking-tighter text-sm uppercase italic">Nexus Edge</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="relative">
                 <Activity size={18} className="text-slate-400" />
                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div className="w-8 h-8 bg-slate-100 rounded-full border border-slate-200" />
           </div>
        </div>
      ),
      code: () => `<header ... />`,
      controls: []
    }
  ];

  const filteredProducts = useMemo(() => {
    if (activeAisle === 'all') return products;
    return products.filter(p => p.aisle === activeAisle);
  }, [activeAisle]);

  const pinnedProducts = useMemo(() => {
    return products.filter(p => pinnedIds.includes(p.id));
  }, [pinnedIds]);

  return (
    <DiseñoBase>
      {/* Floating Canvas Preview Toggle - Moved to Bottom Left for better flow */}
      <button
        onClick={() => setShowCanvas(!showCanvas)}
        className={cn(
          "fixed bottom-8 left-8 z-[100] p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl transition-all flex items-center gap-3 font-black text-[9px] md:text-[10px] uppercase tracking-widest italic",
          showCanvas ? "bg-red-600 text-white" : "bg-primary-600 text-white hover:scale-105",
          pinnedIds.length > 0 && !showCanvas && "animate-pulse shadow-glow-primary"
        )}
      >
        {showCanvas ? <EyeOff size={18}/> : <Eye size={18}/>}
        <span className="hidden sm:inline">{showCanvas ? 'Cerrar Vista Privada' : `Ver en Canvas (${pinnedIds.length})`}</span>
        <span className="sm:hidden">{pinnedIds.length}</span>
      </button>

      {/* Full Screen Integrated Canvas Overlay - Optimized for Performance */}
      <AnimatePresence>
        {showCanvas && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-slate-950 flex flex-col overflow-hidden touch-none"
          >
             <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col p-4 md:p-8 overflow-hidden">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                   <div className="flex flex-col">
                      <h2 className="text-xl md:text-3xl font-black text-white italic uppercase tracking-tighter">Live Canvas Privado</h2>
                      <p className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Ambiente de Integración Jorge H</p>
                   </div>
                   <div className="flex gap-2">
                      <div className="bg-slate-900 p-1.5 rounded-xl border border-slate-800 flex items-center gap-2 md:gap-4 px-3 md:px-6">
                         <span className="text-[7px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest hidden sm:inline">Mockup</span>
                         <div className="flex gap-1 md:gap-2">
                            {(['dark', 'glass', 'high-contrast'] as const).map(bg => (
                              <button
                                key={bg}
                                onClick={() => setLabStyles({...labStyles, background: bg})}
                                className={cn(
                                  "w-5 h-5 md:w-6 md:h-6 rounded-lg border transition-all",
                                  labStyles.background === bg ? "border-primary-500 scale-110 shadow-glow" : "border-slate-800"
                                )}
                                style={{ backgroundColor: bg === 'dark' ? '#020617' : bg === 'glass' ? '#0f172a' : '#ffffff' }}
                              />
                            ))}
                         </div>
                      </div>
                   </div>
                </div>

                <div
                  className={cn(
                    "flex-1 rounded-[2rem] md:rounded-[4rem] border border-white/5 shadow-inner overflow-y-auto custom-scrollbar p-6 md:p-20 space-y-12 md:space-y-20 relative transition-all duration-500",
                    labStyles.background === 'dark' ? "bg-slate-950" :
                    labStyles.background === 'glass' ? "bg-gradient-to-br from-primary-950 to-slate-950" :
                    "bg-white"
                  )}
                >
                   {/* Background Graphics / Mockup Layers - Simplified to prevent lag */}
                   <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                        style={{
                          backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 0)',
                          backgroundSize: '40px 40px'
                        }}
                   />

                   {pinnedProducts.length === 0 ? (
                     <div className="h-full flex flex-col items-center justify-center space-y-6">
                        <Maximize2 size={48} className="text-slate-800" />
                        <div className="text-center px-6">
                           <p className="text-slate-600 font-black uppercase tracking-[0.5em] text-xs">Canvas Vacío</p>
                           <p className="text-[9px] text-slate-800 font-bold uppercase tracking-widest italic mt-2">Usa el icono de "Pin" para previsualizar componentes integrados.</p>
                        </div>
                     </div>
                   ) : (
                     pinnedProducts.map((p, idx) => (
                       <motion.div
                         key={p.id}
                         initial={{ opacity: 0, y: 30 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: idx * 0.05 }}
                         className="flex justify-center w-full"
                       >
                         <div className="w-full max-w-4xl transform-gpu">
                            {p.preview({ loading: false, showData: true })}
                         </div>
                       </motion.div>
                     ))
                   )}
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-8 pb-24">

        {/* Showroom Overlay (The "Teach/Show" Mode) */}
        <AnimatePresence>
          {showShowroom && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8"
            >
               <div className="max-w-4xl w-full space-y-12 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-32 h-32 mx-auto bg-primary-600 rounded-[3rem] flex items-center justify-center text-white shadow-[0_0_100px_rgba(59,130,246,0.5)]"
                  >
                     {(() => {
                        const Icon = aisles.find(a => a.id === showShowroom)?.icon || Layout;
                        return <Icon size={64} />;
                     })()}
                  </motion.div>

                  <div className="space-y-4">
                     <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">
                        {aisles.find(a => a.id === showShowroom)?.label} <span className="text-primary-500">Showroom</span>
                     </h2>
                     <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
                        Explora la filosofía de diseño y la potencia técnica de los componentes integrados en este pasillo.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {[1,2,3].map(i => (
                       <div key={i} className="bg-slate-900 border border-white/5 p-8 rounded-[2.5rem] space-y-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-primary-500">
                             <Sparkles size={20}/>
                          </div>
                          <h4 className="text-white font-black text-xs uppercase italic">Característica {i}</h4>
                          <p className="text-slate-500 text-[10px] font-bold leading-relaxed">Optimización de renderizado en tiempo real para flujos de alta seguridad.</p>
                       </div>
                     ))}
                  </div>

                  <button
                    onClick={() => setShowShowroom(null)}
                    className="px-12 py-5 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
                  >
                     Cerrar Showroom
                  </button>
               </div>

               <button
                 onClick={() => setShowShowroom(null)}
                 className="absolute top-8 right-8 p-4 text-slate-500 hover:text-white transition-all bg-white/5 rounded-full"
               >
                  <X size={32} />
               </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Supermarket Navigation (Aisles) */}
        <aside className={cn(
          "w-full lg:w-80 shrink-0 space-y-8 transition-all duration-700",
          isDesignerMode && "lg:w-24 overflow-hidden"
        )}>
          <div className={cn(
            "bg-slate-950 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group border border-white/5 transition-all duration-500",
            isDesignerMode && "p-4"
          )}>
            {/* Animated Industrial Scan Line */}
            <div className="absolute inset-0 w-full h-[2px] bg-primary-500/20 shadow-[0_0_20px_#3b82f6] top-0 animate-scan pointer-events-none" />

            <div className="absolute -right-4 -top-4 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
               <Cpu size={isDesignerMode ? 40 : 120} className="text-white"/>
            </div>

            {!isDesignerMode ? (
              <div className="relative z-10">
                <h1 className="text-5xl font-black text-white italic tracking-tighter leading-[0.8] uppercase flex flex-col">
                    <span className="text-[10px] font-black tracking-[0.6em] text-primary-500 mb-2 block">System // Supply</span>
                    Private<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Stock</span>
                </h1>
                <div className="h-1 w-12 bg-primary-500 mt-6 rounded-full" />
              </div>
            ) : (
              <div className="flex justify-center py-4">
                 <Wand2 className="text-primary-500 animate-pulse-gamer" size={32} />
              </div>
            )}
          </div>

          <nav className={cn(
            "space-y-3 bg-slate-900/50 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden",
            isDesignerMode && "p-2 items-center flex flex-col"
          )}>
            {/* Tech Background Decoration */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '20px 20px' }} />

            {!isDesignerMode && <p className="px-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] mb-4 text-glow italic">Registry Aisles</p>}

            {aisles.map((aisle) => (
              <div key={aisle.id} className="relative group/aisle w-full">
                <button
                  onClick={() => setActiveAisle(aisle.id)}
                  onDoubleClick={() => setShowShowroom(aisle.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all relative overflow-hidden group/btn",
                    activeAisle === aisle.id
                    ? "bg-primary-600 text-white shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] translate-x-2"
                    : "text-slate-500 hover:bg-white/5 hover:text-slate-200",
                    isDesignerMode && "justify-center px-0 translate-x-0"
                  )}
                >
                   {/* Hover Glow Effect */}
                   <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />

                  <div className="relative z-10">
                    <aisle.icon size={16} className={cn(activeAisle === aisle.id && "animate-pulse")} />
                    {isDesignerMode && activeAisle === aisle.id && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute inset-0 bg-emerald-500 blur-md opacity-50 rounded-full"
                      />
                    )}
                  </div>
                  {!isDesignerMode && <span>{aisle.label}</span>}

                  {/* Tutorial/Guide Trigger Icon */}
                  {!isDesignerMode && (
                    <div className="absolute right-3 flex gap-1 opacity-0 group-hover/aisle:opacity-100 transition-all">
                       <button
                         onClick={(e) => { e.stopPropagation(); setShowAisleGuide(aisle.id); }}
                         className="p-1 hover:text-white bg-white/10 rounded-full"
                         title="Info Rápida"
                       >
                          <Info size={12} />
                       </button>
                       <button
                         onClick={(e) => { e.stopPropagation(); setShowShowroom(aisle.id); }}
                         className="p-1 hover:text-emerald-400 bg-white/10 rounded-full"
                         title="Ver Showroom"
                       >
                          <PlayCircle size={12} />
                       </button>
                    </div>
                  )}
                </button>

                {/* Spontaneous Info Popover */}
                <AnimatePresence>
                  {showAisleGuide === aisle.id && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="absolute left-full top-0 ml-4 z-[110] w-64 p-6 bg-slate-950 border border-primary-500/30 rounded-[2rem] shadow-[0_0_40px_rgba(59,130,246,0.2)] pointer-events-auto"
                    >
                       <div className="flex items-center gap-2 mb-3 text-primary-500">
                          <PlayCircle size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest italic">Aprender Pasillo</span>
                       </div>
                       <h4 className="text-white font-black text-xs uppercase italic mb-2">{aisle.label}</h4>
                       <p className="text-slate-400 text-[10px] font-bold leading-relaxed mb-4">{aisle.desc}</p>
                       <div className="p-3 bg-primary-500/5 rounded-xl border border-primary-500/10">
                          <p className="text-[8px] text-primary-400 font-black uppercase mb-1 italic">Tip Pro:</p>
                          <p className="text-[9px] text-slate-500 font-medium">{aisle.tips}</p>
                       </div>
                       <button
                         onClick={() => setShowAisleGuide(null)}
                         className="mt-4 w-full py-2 bg-slate-900 text-slate-400 rounded-lg text-[8px] font-black uppercase hover:text-white transition-colors"
                       >
                         Entendido
                       </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className={cn(
            "bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-[2.5rem] space-y-3 transition-all",
            isDesignerMode && "p-2 opacity-0 pointer-events-none"
          )}>
             <div className="flex items-center gap-2 text-emerald-600">
                <Zap size={16} fill="currentColor"/>
                <span className="text-xs font-black uppercase tracking-widest italic">Designer Mode</span>
             </div>
             <p className="text-[10px] text-emerald-700/70 leading-relaxed font-medium">
                Activa el modo espontáneo para una interfaz minimalista y creativa.
             </p>
             <button
               onClick={() => setIsDesignerMode(!isDesignerMode)}
               className="w-full py-2 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/20"
             >
                {isDesignerMode ? 'Modo Normal' : 'Modo Diseñador'}
             </button>
          </div>
        </aside>

        {/* Main Supermarket Floor */}
        <main className="flex-1 space-y-12 transition-all duration-500">
          <div className={cn(
            "flex flex-col gap-6 bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl transition-all",
            isDesignerMode && "p-4 border-emerald-500/20 shadow-glow-emerald"
          )}>
             <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 border-b border-slate-800 pb-6">
                <div className="flex items-center gap-6">
                   <div className="flex flex-col border-r border-slate-800 pr-6">
                      <span className="text-xs font-black text-white italic uppercase tracking-tighter">Private Supermarket</span>
                      <span className="text-[8px] font-bold text-primary-500 uppercase tracking-widest mt-0.5">
                        Lab Engine v3.5
                      </span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full animate-pulse", isDesignerMode ? "bg-emerald-500" : "bg-primary-500")}/>
                      <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">
                        {isDesignerMode ? 'Modo Espontáneo Activo' : 'Systems Online'}
                      </span>
                   </div>
                </div>

                <div className="flex items-center gap-4">
                   <button
                     onClick={() => setIsDesignerMode(!isDesignerMode)}
                     className={cn(
                       "p-2 rounded-xl border transition-all flex items-center gap-2 px-4 text-[9px] font-black uppercase tracking-widest",
                       isDesignerMode ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-950 border-slate-800 text-slate-500 hover:text-white"
                     )}
                   >
                     {isDesignerMode ? <Brush size={14}/> : <Wand2 size={14}/>}
                     {isDesignerMode ? 'DISEÑO ACTIVADO' : 'MODO DISEÑADOR'}
                   </button>
                   <div className="bg-slate-950 text-slate-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-800">
                      Modo Desarrollador
                   </div>
                </div>
             </div>

             {/* Lab Customization Controls */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Estilo de Bordes</span>
                   <div className="flex gap-2">
                      {(['normal', 'thick', 'none'] as const).map(b => (
                        <button
                          key={b}
                          onClick={() => setLabStyles({...labStyles, borders: b})}
                          className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                            labStyles.borders === b ? "bg-primary-600 border-primary-500 text-white" : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700"
                          )}
                        >
                          {b}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-3">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Fondo del Lab</span>
                   <div className="flex gap-2">
                      {(['dark', 'glass', 'high-contrast'] as const).map(bg => (
                        <button
                          key={bg}
                          onClick={() => setLabStyles({...labStyles, background: bg})}
                          className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                            labStyles.background === bg ? "bg-primary-600 border-primary-500 text-white" : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700"
                          )}
                        >
                          {bg}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-12 relative">
             <AnimatePresence mode="popLayout">
               {filteredProducts.map((product) => (
                 <ProductCard
                   key={product.id}
                   {...product}
                   labStyles={labStyles}
                   isPinned={pinnedIds.includes(product.id)}
                   onTogglePin={() => togglePin(product.id)}
                   onTeachMe={() => setTeachingComponent(product.id)}
                 />
               ))}
             </AnimatePresence>

             {/* Component Tutorial Overlay (Teaching Mode) */}
             <AnimatePresence>
                {teachingComponent && (
                  <motion.div
                    initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
                    exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    className="fixed inset-0 z-[120] bg-slate-950/80 flex items-center justify-center p-8"
                  >
                     <motion.div
                       initial={{ scale: 0.9, y: 20 }}
                       animate={{ scale: 1, y: 0 }}
                       className="max-w-2xl w-full bg-slate-900 border border-primary-500/30 rounded-[3rem] p-10 shadow-[0_0_100px_rgba(59,130,246,0.1)] relative"
                     >
                        <button onClick={() => setTeachingComponent(null)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-all">
                           <X size={24} />
                        </button>

                        <div className="flex items-center gap-4 mb-8">
                           <div className="p-3 bg-primary-600 rounded-2xl text-white shadow-glow">
                              <Sparkles size={28} />
                           </div>
                           <div>
                              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Guía de Integración</h3>
                              <p className="text-[10px] text-primary-400 font-black uppercase tracking-[0.4em]">Módulo: {products.find(p => p.id === teachingComponent)?.title}</p>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative group">
                              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
                                 <Wand2 size={24} className="text-primary-500" />
                              </div>
                              <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-2 italic">Chispa de Imaginación:</p>
                              <p className="text-slate-300 text-sm font-bold leading-relaxed italic pr-8">
                                 "{aisles.find(a => a.id === products.find(p => p.id === teachingComponent)?.aisle)?.imagination || 'Usa tu imaginación para crear algo único.'}"
                              </p>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-2">Uso Recomendado</span>
                                 <p className="text-[10px] text-white font-bold uppercase tracking-tight">Interfaces de Alta Seguridad</p>
                              </div>
                              <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-2">Impacto Visual</span>
                                 <p className="text-[10px] text-white font-bold uppercase tracking-tight">Nivel Crítico // Alto</p>
                              </div>
                           </div>

                           <Boton onClick={() => setTeachingComponent(null)} className="w-full py-4 text-xs">
                              ENTENDIDO, VOLVER AL LABORATORIO
                           </Boton>
                        </div>
                     </motion.div>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="h-[400px] flex flex-col items-center justify-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
               <Ghost size={64} className="text-slate-200 mb-4 animate-bounce" />
               <p className="text-slate-400 font-black uppercase tracking-widest italic">Pasillo Vacío - Próximamente Suministros</p>
            </div>
          )}

          {/* Footer Logistics */}
          <div className="flex justify-between items-center pt-12 border-t border-slate-100">
             <div className="flex items-center gap-4 text-slate-300 font-mono text-[9px] uppercase tracking-[0.5em]">
                <Sparkles size={12}/> Global Sourcing Center
             </div>
             <div className="flex items-center gap-6">
                <History size={14} className="text-slate-200"/>
                <Activity size={14} className="text-slate-200"/>
                <ShieldCheck size={14} className="text-slate-200"/>
             </div>
          </div>
        </main>
      </div>
    </DiseñoBase>
  );
};
