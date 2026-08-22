import { useState, ReactNode, useMemo } from 'react';
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
  Ghost
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

const ProductCard = ({
  id,
  title,
  description,
  preview,
  code,
  controls,
  aisle,
  type
}: {
  id: number;
  title: string;
  description: string;
  preview: (props: any) => ReactNode;
  code: (props: any) => string;
  controls: ControlConfig[];
  aisle: string;
  type: string;
}) => {
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
          <button onClick={() => setViewMode('desktop')} className={cn("p-1.5 rounded-lg transition-all", viewMode === 'desktop' ? "bg-primary-600 text-white" : "text-slate-400 hover:bg-slate-100")}><Monitor size={14}/></button>
          <button onClick={() => setViewMode('mobile')} className={cn("p-1.5 rounded-lg transition-all", viewMode === 'mobile' ? "bg-primary-600 text-white" : "text-slate-400 hover:bg-slate-100")}><Smartphone size={14}/></button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[400px]">
        {/* Preview / Code Display */}
        <div className="flex-1 bg-slate-950 p-6 flex flex-col items-center justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 0)', backgroundSize: '24px 24px' }} />

           <div className={cn(
             "bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-800 transition-all duration-500 flex items-center justify-center p-8 relative",
             viewMode === 'mobile' ? "w-[280px] h-[350px]" : "w-full h-full max-h-[350px]"
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
                  {control.options?.map(opt => (
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

export const PaginaLaboratorio = () => {
  const [activeAisle, setActiveAisle] = useState('all');

  const aisles = [
    { id: 'all', label: 'Todo el Stock', icon: Layout },
    { id: 'UI', label: 'Pasillo 1: Interacción', icon: MousePointer2 },
    { id: 'Forms', label: 'Pasillo 2: Captura Datos', icon: FormInput },
    { id: 'Sec', label: 'Pasillo 3: Seguridad', icon: Lock },
    { id: 'Data', label: 'Pasillo 4: Analíticas', icon: Activity },
    { id: 'Layouts', label: 'Pasillo 5: Estructuras', icon: Boxes },
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
      aisle: 'Acceso',
      type: 'login',
      title: 'Login Nexus Auth',
      description: 'Estructura de formulario de acceso seguro con feedback.',
      preview: (p: any) => (
        <div className="w-full max-w-xs space-y-4 p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl">
           <div className="text-center space-y-1 mb-6">
              <h4 className="text-slate-900 font-black text-lg italic uppercase tracking-tighter">Acceso Nexus</h4>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Ingrese credenciales de seguridad</p>
           </div>
           <Entrada label="Usuario" placeholder="admin@nexus.io" />
           <Entrada label="Clave" type="password" placeholder="••••••••" />
           <Boton className="w-full mt-4" variant={p.btnVariant} isLoading={p.loading}>ENTRAR AL NODO</Boton>
        </div>
      ),
      code: (p: any) => `<form ... />`,
      controls: [
        { name: 'btnVariant', type: 'select', label: 'Color Botón', options: ['primary', 'secondary', 'danger'] },
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

  return (
    <DiseñoBase>
      <div className="flex flex-col lg:flex-row gap-8 pb-24">

        {/* Supermarket Navigation (Aisles) */}
        <aside className="w-full lg:w-72 shrink-0 space-y-8">
          <div className="bg-slate-950 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
               <Cpu size={80} className="text-white"/>
            </div>
            <h1 className="text-4xl font-black text-white italic tracking-tighter leading-none uppercase">
                Nexus<br/><span className="text-primary-500">Supermarket</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-4">Enterprise Supplies v3.0</p>
          </div>

          <nav className="space-y-2 bg-slate-900 p-4 rounded-[2.5rem] border border-slate-800 shadow-xl">
            <p className="px-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">Navegar Pasillos</p>
            {aisles.map((aisle) => (
              <button
                key={aisle.id}
                onClick={() => setActiveAisle(aisle.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all",
                  activeAisle === aisle.id
                  ? "bg-primary-600 text-white shadow-xl shadow-primary-500/40 translate-x-2"
                  : "text-slate-500 hover:bg-slate-800 hover:text-slate-200"
                )}
              >
                <aisle.icon size={16} />
                {aisle.label}
              </button>
            ))}
          </nav>

          <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-[2.5rem] space-y-3">
             <div className="flex items-center gap-2 text-emerald-600">
                <Zap size={16} fill="currentColor"/>
                <span className="text-xs font-black uppercase tracking-widest italic">Fast Delivery</span>
             </div>
             <p className="text-[10px] text-emerald-700/70 leading-relaxed font-medium">
                Selecciona componentes, configura sus parámetros y extrae el código fuente listo para producción.
             </p>
          </div>
        </aside>

        {/* Main Supermarket Floor */}
        <main className="flex-1 space-y-12">
          {/* Market Status Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-slate-900 px-8 py-5 rounded-[2rem] border border-slate-800 shadow-2xl gap-4">
             <div className="flex items-center gap-6">
                <div className="flex flex-col border-r border-slate-800 pr-6">
                   <span className="text-xs font-black text-white italic uppercase tracking-tighter">Nexus Supermarket</span>
                   <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                     Terminal: <span className="text-primary-500/60">{window.location.hostname}</span>
                   </span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
                   <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">Inventory Live</span>
                </div>
                <div className="h-4 w-[1px] bg-slate-800 hidden md:block"/>
                <div className="text-[10px] font-bold text-slate-500">
                   Mostrando <span className="text-primary-500">{filteredProducts.length}</span> Suministros Disponibles
                </div>
             </div>

             <div className="flex items-center gap-6">
                <div className="bg-slate-950 text-slate-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-800">
                   Shift + C para Copiar
                </div>
                <div className="text-[9px] font-black text-slate-600 italic uppercase tracking-widest ml-4">
                   Build with <span className="text-primary-500/30">jorgedevop</span> help
                </div>
             </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-12">
             <AnimatePresence mode="popLayout">
               {filteredProducts.map((product) => (
                 <ProductCard
                   key={product.id}
                   {...product}
                 />
               ))}
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
