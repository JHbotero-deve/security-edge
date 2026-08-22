import { useState, ReactNode, useMemo } from 'react';
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
  Lock
} from 'lucide-react';
import { cn, copyToClipboard } from '@/shared/utils/index';
import { EscudoSeguridad } from '../components/EscudoSeguridad';

// --- Nexus Supermarket Engine ---

const ProductCard = ({
  title,
  description,
  preview,
  code,
  controls,
  aisle
}: {
  title: string;
  description: string;
  preview: (props: any) => ReactNode;
  code: (props: any) => string;
  controls: { name: string; type: 'boolean' | 'select' | 'text'; options?: string[]; label: string }[];
  aisle: string;
}) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden flex flex-col shadow-sm hover:shadow-2xl hover:border-primary-300 transition-all duration-500"
    >
      {/* Product Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-xl shadow-sm text-primary-600 group-hover:scale-110 transition-transform">
            <Boxes size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full uppercase tracking-widest">{aisle}</span>
              <h3 className="text-slate-900 font-black text-sm uppercase tracking-tighter">{title}</h3>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">{description}</p>
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setViewMode('desktop')} className={cn("p-1.5 rounded-lg transition-all", viewMode === 'desktop' ? "bg-primary-600 text-white" : "text-slate-400 hover:bg-slate-100")}><Monitor size={14}/></button>
          <button onClick={() => setViewMode('mobile')} className={cn("p-1.5 rounded-lg transition-all", viewMode === 'mobile' ? "bg-primary-600 text-white" : "text-slate-400 hover:bg-slate-100")}><Smartphone size={14}/></button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[400px]">
        {/* Preview / Code Display */}
        <div className="flex-1 bg-slate-50/50 p-6 flex flex-col items-center justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-100">
           <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '20px 20px' }} />

           <div className={cn(
             "bg-white rounded-[2rem] shadow-xl border border-slate-200 transition-all duration-500 flex items-center justify-center p-8 relative",
             viewMode === 'mobile' ? "w-[280px] h-[350px]" : "w-full h-full max-h-[350px]"
           )}>
             <AnimatePresence mode="wait">
               {showCode ? (
                 <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full relative group/code">
                   <pre className="w-full h-full bg-slate-950 text-emerald-400 p-5 rounded-2xl text-[10px] font-mono overflow-auto custom-scrollbar leading-relaxed">
                     <code>{code(props)}</code>
                   </pre>
                   <button onClick={handleCopy} className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all backdrop-blur-md border border-white/10">
                     {copied ? <Check size={14} className="text-emerald-400"/> : <Copy size={14}/>}
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
        <div className="w-full lg:w-64 p-5 space-y-5 bg-white overflow-y-auto">
          <div className="flex items-center gap-2 text-slate-900 border-b border-slate-50 pb-3">
            <Settings2 size={14} className="text-primary-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Configuración</span>
          </div>

          {controls.map((control) => (
            <div key={control.name} className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{control.label}</label>
              {control.type === 'boolean' ? (
                <button
                  onClick={() => setProps({ ...props, [control.name]: !props[control.name] })}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all text-xs font-bold",
                    props[control.name] ? "border-primary-600 bg-primary-50 text-primary-700" : "border-slate-100 bg-slate-50 text-slate-500"
                  )}
                >
                  {props[control.name] ? 'Activo' : 'Inactivo'}
                  <div className={cn("w-3 h-3 rounded-full", props[control.name] ? "bg-primary-600" : "bg-slate-300")} />
                </button>
              ) : control.type === 'select' ? (
                <div className="grid grid-cols-2 gap-1.5">
                  {control.options?.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setProps({ ...props, [control.name]: opt })}
                      className={cn(
                        "text-[9px] font-black p-2 rounded-lg border transition-all uppercase truncate",
                        props[control.name] === opt ? "border-primary-600 bg-primary-600 text-white" : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
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
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-primary-500"
                  placeholder="Personalizar..."
                />
              )}
            </div>
          ))}

          <div className="pt-4 space-y-2">
             <Boton
               onClick={() => setShowCode(!showCode)}
               variant="secondary"
               className="w-full text-[10px] py-2 rounded-xl border-dashed"
             >
               {showCode ? <Layout size={12} className="mr-2"/> : <Code2 size={12} className="mr-2"/>}
               {showCode ? 'PREVIEW PRODUCTO' : 'OBTENER CÓDIGO'}
             </Boton>
             <button className="w-full py-2 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors">
                <ShoppingCart size={10} /> Añadir a mi Proyecto
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const PaginaLaboratorio = () => {
  const [activeAisle, setActiveAisle] = useState('all');

  const aisles = [
    { id: 'all', label: 'Todo el Stock', icon: Layout },
    { id: 'UI', label: 'Pasillo 1: Interacción', icon: MousePointer2 },
    { id: 'Forms', label: 'Pasillo 2: Captura Datos', icon: FormInput },
    { id: 'Sec', label: 'Pasillo 3: Seguridad', icon: Lock },
    { id: 'Data', label: 'Pasillo 4: Analíticas', icon: Activity },
  ];

  const products = [
    {
      id: 1,
      aisle: 'UI',
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
      id: 3,
      aisle: 'Sec',
      title: 'Escudo Dinámico',
      description: 'Visualizador de estado de seguridad con animaciones radiales.',
      preview: (p: any) => <EscudoSeguridad nivel={p.nivel} estado={p.estado} />,
      code: (p: any) => `<EscudoSeguridad \n  nivel={${p.nivel}} \n  estado="${p.estado}" \n/>`,
      controls: [
        { name: 'nivel', type: 'select', label: 'Nivel Protección', options: ['10', '50', '95', '100'] },
        { name: 'estado', type: 'select', label: 'Estado', options: ['seguro', 'alerta', 'critico'] }
      ]
    },
    {
        id: 4,
        aisle: 'Data',
        title: 'Nexus Data Grid',
        description: 'Tabla de alta disponibilidad para volúmenes masivos.',
        preview: () => (
          <div className="w-full max-w-md bg-white p-2 rounded-2xl border border-slate-100">
            <TablaDatos
                columns={[{header: 'ID', key: 'id'}, {header: 'STATUS', key: 's'}]}
                data={[{id: 'SRV-1', s: 'OK'}, {id: 'SRV-2', s: 'FAIL'}]}
            />
          </div>
        ),
        code: () => `<TablaDatos \n  columns={[...]} \n  data={[...]} \n/>`,
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

          <nav className="space-y-2 bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <p className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Navegar Pasillos</p>
            {aisles.map((aisle) => (
              <button
                key={aisle.id}
                onClick={() => setActiveAisle(aisle.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all",
                  activeAisle === aisle.id
                  ? "bg-primary-600 text-white shadow-xl shadow-primary-500/20 translate-x-2"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
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
          <div className="flex flex-col md:flex-row items-center justify-between bg-white px-8 py-5 rounded-[2rem] border border-slate-100 shadow-sm gap-4">
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
                   <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Inventory Live</span>
                </div>
                <div className="h-4 w-[1px] bg-slate-100 hidden md:block"/>
                <div className="text-[10px] font-bold text-slate-400">
                   Mostrando <span className="text-slate-900">{filteredProducts.length}</span> Suministros Disponibles
                </div>
             </div>

             <div className="flex items-center gap-3">
                <div className="bg-slate-100 text-slate-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                   Shift + C para Copiar
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
