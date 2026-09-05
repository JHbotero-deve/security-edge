import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  Image as ImageIcon,
  Send,
  X,
  Sparkles,
  Bot,
  User,
  Paperclip,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { cn } from '@/shared/utils';

interface Mensaje {
  id: string;
  texto: string;
  emisor: 'bot' | 'usuario';
  imagen?: string;
  hora: string;
}

export const AsistenteNexus = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      id: '1',
      texto: '¡Hola! Soy tu Asistente Privado. Puedo analizar imágenes, escuchar tus comandos y ayudarte a construir tu infraestructura. ¿Qué necesitas hoy?',
      emisor: 'bot',
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [previewImagen, setPreviewImagen] = useState<string | null>(null);
  const [nombreArchivo, setNombreArchivo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensajes, isBotTyping]);

  // Inicializar Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'es-ES';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        setInput(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const handleSend = () => {
    if (!input.trim() && !previewImagen && !nombreArchivo) return;

    const textoMensaje = input || (nombreArchivo ? `Archivo adjunto: ${nombreArchivo}` : '');

    const nuevoMensaje: Mensaje = {
      id: Date.now().toString(),
      texto: textoMensaje,
      emisor: 'usuario',
      imagen: previewImagen || undefined,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMensajes(prev => [...prev, nuevoMensaje]);
    setInput('');
    setPreviewImagen(null);
    setNombreArchivo(null);
    setIsBotTyping(true);

    // Respuesta simulada del bot con inteligencia
    setTimeout(() => {
      setIsBotTyping(false);
      const respuestaBot: Mensaje = {
        id: (Date.now() + 1).toString(),
        texto: previewImagen
          ? 'He analizado tu imagen. Los patrones de seguridad detectados son óptimos. ¿Quieres que los aplique al constructor?'
          : nombreArchivo
          ? `He recibido el archivo "${nombreArchivo}". Estoy escaneando posibles vulnerabilidades...`
          : 'Entendido. Estoy procesando tu solicitud de infraestructura en tiempo real.',
        emisor: 'bot',
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMensajes(prev => [...prev, respuestaBot]);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNombreArchivo(file.name);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImagen(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Tu navegador no soporta reconocimiento de voz.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-24 right-8 z-[100] p-4 bg-primary-600 text-white rounded-full shadow-2xl transition-all hover:scale-110 group",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={cn(
              "fixed z-[100] bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden transition-all duration-300",
              isExpanded
                ? "inset-4 md:inset-8"
                : "bottom-4 right-4 left-4 md:left-auto md:right-8 md:bottom-8 md:w-[400px] h-[80vh] md:h-[600px] rounded-[2rem] md:rounded-[2.5rem]"
            )}
          >
            {/* Header */}
            <div className="p-6 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white italic uppercase tracking-tighter">Asistente Privado</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Enlace Neuronal Activo</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 text-slate-500 hover:text-white transition-colors">
                  {isExpanded ? <Minimize2 size={16}/> : <Maximize2 size={16}/>}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:text-red-500 transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-designer-grid">
              {mensajes.map((msg) => (
                <div key={msg.id} className={cn("flex flex-col", msg.emisor === 'usuario' ? "items-end" : "items-start")}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-3xl text-[11px] font-medium leading-relaxed shadow-lg",
                    msg.emisor === 'usuario'
                      ? "bg-primary-600 text-white rounded-tr-none"
                      : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700"
                  )}>
                    {msg.imagen && (
                      <div className="relative w-full max-h-[300px] overflow-hidden rounded-2xl mb-3 border border-white/10 bg-slate-950">
                        <img
                          src={msg.imagen}
                          alt="upload"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    {msg.texto}
                  </div>
                  <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest mt-2 px-2">{msg.hora}</span>
                </div>
              ))}

              {isBotTyping && (
                <div className="flex flex-col items-start animate-pulse">
                  <div className="bg-slate-800 text-slate-400 p-4 rounded-3xl rounded-tl-none border border-slate-700 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Sparkles size={12} className="animate-spin" /> Analizando Datos...
                  </div>
                </div>
              )}
            </div>

            {/* Preview Image/File Bar */}
            {(previewImagen || nombreArchivo) && (
              <div className="px-6 py-3 bg-slate-950/80 backdrop-blur-md flex items-center justify-between border-t border-slate-800">
                <div className="flex items-center gap-3 overflow-hidden">
                  {previewImagen ? (
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 bg-slate-900">
                      <img src={previewImagen} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-white/5 text-primary-500">
                      <Paperclip size={20} />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-white uppercase truncate max-w-[200px]">
                      {nombreArchivo || 'Imagen seleccionada'}
                    </span>
                    <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">Listo para enviar</span>
                  </div>
                </div>
                <button
                  onClick={() => { setPreviewImagen(null); setNombreArchivo(null); }}
                  className="p-2 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Input Area */}
            <div className="p-6 bg-slate-950/50 border-t border-slate-800">
              <div className="flex items-end gap-3">
                <div className="flex-1 bg-slate-900 rounded-[2rem] border border-slate-800 focus-within:border-primary-500/50 transition-all p-2 flex flex-col">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    placeholder="Describe tu requerimiento..."
                    className="w-full bg-transparent border-none text-[11px] text-white placeholder-slate-600 focus:ring-0 resize-none px-4 py-2 min-h-[40px] max-h-[150px] custom-scrollbar"
                  />
                  <div className="flex items-center justify-between px-2 pb-1">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 text-slate-500 hover:text-primary-500 hover:bg-primary-500/10 rounded-xl transition-all"
                      >
                        <ImageIcon size={16} />
                      </button>
                      <button
                        onClick={toggleRecording}
                        className={cn(
                          "p-2 rounded-xl transition-all",
                          isRecording ? "bg-red-500 text-white animate-pulse" : "text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/10"
                        )}
                      >
                        <Mic size={16} />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*,application/pdf,.txt,.doc,.docx"
                        className="hidden"
                      />
                    </div>
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() && !previewImagen && !nombreArchivo}
                      className={cn(
                        "p-2.5 rounded-xl transition-all",
                        (input.trim() || previewImagen || nombreArchivo) ? "bg-primary-600 text-white shadow-glow" : "text-slate-700 bg-slate-950"
                      )}
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-[7px] font-bold text-slate-600 uppercase tracking-[0.2em] text-center mt-4">
                Powered by Private Neural Engine // Multi-Modal v1.0
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
