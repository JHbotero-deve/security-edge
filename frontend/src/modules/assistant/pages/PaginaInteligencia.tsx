import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { Boton } from '@/components/Boton';
import {
  Sparkles,
  Send,
  Brain,
  Code2,
  Zap,
  Terminal as TerminalIcon,
  Cpu,
  ShieldCheck,
  Activity,
  Command,
  History,
  Lightbulb,
  MessageSquare,
  Bot,
  Search,
  ChevronRight,
  Braces,
  Copy
} from 'lucide-react';
import { cn } from '@/shared/utils/index';

// NOTA: Este asistente responde con reglas simuladas (setTimeout + keywords),
// no está conectado a un modelo de IA real. Para producción, reemplazar
// handleSend por una llamada a un endpoint propio (ej: api.post('/assistant', ...))
// que a su vez llame a un proveedor de IA con su API key en el backend
// (nunca exponer una API key de IA en el frontend).

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'code' | 'suggestion';
  code?: string;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'system-manifesto',
    role: 'assistant',
    content: 'CONEXIÓN ESTABLECIDA. Se ha desplegado el MANIFIESTO DE ASISTENCIA NEXUS. Este nodo está configurado para acelerar tu desarrollo sin fricciones.',
    type: 'suggestion',
    timestamp: new Date(),
    code: `// --- PROTOCOLO DE AYUDA NEXUS v4.5 ---
// 1. ARQUITECTURA: Rutas y controladores seguros.
// 2. COMPONENTES: UI auditada (Tailwind + Lucide).
// 3. SEGURIDAD: Validación de integridad en tiempo real.
// 4. DOCUMENTACIÓN: Solo se genera al completar el 100% de la lógica.
//    (Advertencia activa: Si el código está incompleto, no habrá docs).

// ESTADO: LISTO PARA DESARROLLO ULTRAPRO.
// COMANDO CLAVE: /finalizar (Audita, Asegura y Documenta).`
  }
];

const SUGGESTIONS = [
  "Crear Botón Inteligente",
  "Auditoría de Seguridad",
  "Generar Rutas Pro",
  "Finalizar y Documentar"
];

export const PaginaInteligencia = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('nexus_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
      } catch (e) {
        return INITIAL_MESSAGES;
      }
    }
    return INITIAL_MESSAGES;
  });
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('nexus_chat_history', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    // Capa de ahorro de Tokens: Verificar caché de respuestas idénticas
    const cachedResponse = messages.find(m =>
      m.role === 'assistant' &&
      messages[messages.indexOf(m) - 1]?.content === inputValue
    );

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    if (cachedResponse) {
      // Si ya preguntaste esto y tenemos la respuesta, no procesamos de nuevo
      setTimeout(() => {
        const newAssistantMsg: Message = {
          ...cachedResponse,
          id: (Date.now() + 1).toString(),
          timestamp: new Date()
        };
        setMessages(prev => [...prev, newAssistantMsg]);
      }, 500);
      return;
    }

    setIsThinking(true);

    // Simular procesamiento del núcleo
    setTimeout(() => {
      let responseContent = `He procesado tu requerimiento: "${userMsg.content}".`;
      let assistantCode = "";

      if (userMsg.content.toLowerCase().includes('finalizar')) {
        responseContent = "Iniciando protocolo de finalización... AUDITANDO COMPONENTES... [OK]. VERIFICANDO RUTAS... [OK]. ADVERTENCIA: Se han detectado módulos sin lógica de negocio completa. No se generará el README.md oficial hasta que todos los nodos estén cerrados. Por favor, completa la integración del Backend para habilitar la documentación automática.";
        assistantCode = "// ESTADO: ESPERANDO CIERRE DE NODOS\n// DOCUMENTACIÓN BLOQUEADA PARA EVITAR REDUNDANCIAS.";
      } else if (userMsg.content.toLowerCase().includes('botón inteligente')) {
        responseContent = "He generado un nodo de acción inteligente. Este componente detecta automáticamente el contexto de la página y te pregunta la ruta o función a ejecutar antes de consolidar el código.";
        assistantCode = "// COMPONENTE SMART ACTION\n<BotonInteligente \n  intent='auto' \n  theme='primary' \n/>";
      } else {
        assistantCode = userMsg.content.toLowerCase().includes('auth')
          ? "export const authMiddleware = (req, res, next) => {\n  const token = req.headers.authorization;\n  if (!token) return res.status(401).send('No Auth');\n  next();\n};"
          : "const nexusComponent = () => {\n  return <div className='p-8 bg-slate-900'>Nexus Core</div>\n};";
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        code: assistantCode,
        type: 'code',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsThinking(false);
    }, 1200);
  };

  return (
    <DiseñoBase>
      <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-160px)] -mt-4">

        {/* Sidebar: Engine Info */}
        <aside className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
               <Brain size={120} className="text-primary-500" />
            </div>
            <div className="relative z-10 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-tr from-primary-600 to-indigo-500 rounded-xl text-white shadow-glow">
                    <Sparkles size={20} className="animate-pulse" />
                  </div>
                  <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-tight">Pregúntale a<br/><span className="text-primary-400">Nexus</span></h1>
               </div>
               <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-2">Intelligence Engine v4.2</p>

               <div className="pt-6 space-y-3">
                  <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-slate-400">
                     <span>Estado de Red</span>
                     <span className="text-emerald-500 flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" /> Conectado</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                     <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-gradient-to-r from-primary-600 to-indigo-400" />
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-[2rem] space-y-4 shadow-xl">
             <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Search size={14} className="text-primary-500" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Atajos Inteligentes</span>
             </div>
             <div className="space-y-2">
                {['/analizar_infra', '/generar_crud', '/auditar_seguridad', '/docs_api'].map(cmd => (
                  <button key={cmd} className="w-full flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800/50 rounded-xl hover:border-primary-500 group transition-all text-left">
                     <span className="text-[10px] font-mono text-slate-400 group-hover:text-primary-400">{cmd}</span>
                     <ChevronRight size={12} className="text-slate-700 group-hover:text-primary-500" />
                  </button>
                ))}
             </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600/10 to-transparent border border-indigo-500/20 p-6 rounded-[2.5rem] space-y-4">
             <div className="flex items-center gap-2 text-indigo-400">
                <Braces size={14} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-widest">Protocolo de Operación</span>
             </div>
             <div className="space-y-3">
                <div className="flex gap-2">
                   <div className="w-1 h-1 rounded-full bg-indigo-500 mt-1" />
                   <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter leading-tight">Documentación Inteligente: Solo al finalizar con éxito (Evitar basura).</p>
                </div>
                <div className="flex gap-2">
                   <div className="w-1 h-1 rounded-full bg-indigo-500 mt-1" />
                   <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter leading-tight">Auditoría 360°: Cada componente se entrega verificado y seguro.</p>
                </div>
                <div className="flex gap-2">
                   <div className="w-1 h-1 rounded-full bg-indigo-500 mt-1" />
                   <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter leading-tight">Seguridad Nexus: Auditoría automática en cada respuesta.</p>
                </div>
             </div>
          </div>
        </aside>

        {/* Main Interface: Conversational Space */}
        <main className="flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)', backgroundSize: '30px 30px' }} />

          {/* Top Bar Area */}
          <div className="px-8 py-5 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md flex items-center justify-between relative z-10">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary-500 shadow-glow" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Nodo de Inteligencia Activo</span>
             </div>
             <div className="flex gap-4">
                <button
                  onClick={() => {
                    localStorage.removeItem('nexus_chat_history');
                    setMessages(INITIAL_MESSAGES);
                  }}
                  className="px-3 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-lg text-[8px] font-black text-primary-400 uppercase tracking-widest hover:bg-primary-500 hover:text-white transition-all"
                >
                   🗑️ Limpiar Memoria
                </button>
                <button
                  onClick={() => setMessages(prev => [...prev, INITIAL_MESSAGES[0]])}
                  className="px-3 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-lg text-[8px] font-black text-primary-400 uppercase tracking-widest hover:bg-primary-500 hover:text-white transition-all"
                >
                   📜 Ver Manifiesto
                </button>
                <button className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                   <History size={14}/> Comandos
                </button>
             </div>
          </div>

          {/* Chat Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-10 min-h-[450px] relative z-10">
             <AnimatePresence mode="popLayout">
               {messages.map((msg) => (
                 <motion.div
                   key={msg.id}
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                   className={cn("flex gap-5 max-w-[90%]", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}
                 >
                   <div className={cn(
                     "w-14 h-14 shrink-0 rounded-[1.8rem] flex items-center justify-center border shadow-2xl transition-all hover:scale-110 active:scale-95 group",
                     msg.role === 'user' ? "bg-slate-800 border-white/5 text-slate-500" : "bg-primary-600 border-primary-400 text-white shadow-glow-strong"
                   )}>
                      {msg.role === 'user' ? <TerminalIcon size={24}/> : <Bot size={24} className="group-hover:animate-pulse"/>}
                   </div>
                   <div className="space-y-4">
                      <div className={cn(
                        "p-8 rounded-[3rem] text-[13px] leading-relaxed shadow-2xl relative overflow-hidden",
                        msg.role === 'user'
                          ? "bg-slate-800 text-white rounded-tr-none border border-white/5"
                          : "bg-slate-950 text-slate-300 rounded-tl-none border border-white/5"
                      )}>
                         {msg.role === 'assistant' && (
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 to-indigo-500 opacity-20" />
                         )}
                         <p className="font-bold tracking-tight text-slate-200">{msg.content}</p>

                         {msg.code && (
                           <div className="mt-6 rounded-2xl overflow-hidden border border-slate-800 bg-black/50">
                              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                                 <span className="text-[8px] font-black text-slate-500 uppercase">Nexus Snippet</span>
                                 <Code2 size={12} className="text-primary-500" />
                              </div>
                              <pre className="p-4 text-[11px] font-mono text-emerald-400 overflow-x-auto custom-scrollbar">
                                 <code>{msg.code}</code>
                              </pre>
                           </div>
                         )}

                         <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600">
                               {msg.timestamp.toLocaleTimeString()} // ID_{msg.id}
                            </span>
                            {msg.role === 'assistant' && (
                              <button className="flex items-center gap-1.5 text-[8px] font-black text-primary-500 uppercase hover:text-primary-400">
                                 <Copy size={10}/> Copiar Resultado
                              </button>
                            )}
                         </div>
                      </div>
                   </div>
                 </motion.div>
               ))}

               {isThinking && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-5 ml-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-glow"><Sparkles size={20} className="animate-spin-slow"/></div>
                    <div className="bg-slate-950 p-6 rounded-[2.5rem] rounded-tl-none border border-slate-800 flex gap-2 items-center">
                       <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                       <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                       <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" />
                       <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-2">Consultando Núcleo...</span>
                    </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          {/* Prompt Engine Footer */}
          <div className="p-8 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800">
             {/* Dynamic Suggestions */}
             <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar pb-2">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => setInputValue(s)}
                    className="whitespace-nowrap px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-primary-500 hover:text-white hover:bg-primary-600/5 transition-all"
                  >
                    {s}
                  </button>
                ))}
             </div>

             <div className="relative group">
                <div className="absolute inset-0 bg-primary-600/20 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Describe tu requerimiento de desarrollo o usa '/' para comandos..."
                  className="w-full bg-slate-900 border-2 border-slate-800 rounded-[2.5rem] px-10 py-6 pr-36 text-sm font-bold text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-500 focus:ring-8 focus:ring-primary-500/5 transition-all shadow-2xl relative z-10"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 z-20">
                   <div className="hidden md:flex flex-col items-end mr-2">
                      <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest italic">Núcleo Nexus v4.2</span>
                      <span className="text-[9px] font-bold text-amber-500 uppercase">Modo Demostración</span>
                   </div>
                   <button
                     onClick={handleSend}
                     className="p-4 bg-primary-600 hover:bg-primary-500 text-white rounded-[1.5rem] shadow-glow transition-all active:scale-95"
                   >
                     <Send size={22}/>
                   </button>
                </div>
             </div>
             <div className="flex justify-center gap-8 mt-6">
                <div className="flex items-center gap-2">
                   <Command size={10} className="text-slate-600"/>
                   <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest italic">Comandos: /</span>
                </div>
                <div className="flex items-center gap-2">
                   <Activity size={10} className="text-slate-600"/>
                   <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest italic">Auditoría en Tiempo Real</span>
                </div>
             </div>
          </div>
        </main>
      </div>
    </DiseñoBase>
  );
};
