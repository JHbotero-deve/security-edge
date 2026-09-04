import { useState } from 'react';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { useConfiguracion } from '@/store/configuracion.estado';
import {
  Settings,
  Save,
  Shield,
  Palette,
  Database,
  WifiOff,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Check
} from 'lucide-react';
import { Boton } from '@/components/Boton';
import { Entrada } from '@/components/Entrada';
import { cn } from '@/shared/utils';

export const PaginaConfiguracion = () => {
  const config = useConfiguracion();
  const [copied, setCopied] = useState(false);
  const [tempName, setTempName] = useState(config.appName);

  const handleSaveName = () => {
    config.setAppName(tempName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportData = () => {
    const data = {
      config: config,
      projects: localStorage.getItem('nexus_saved_projects'),
      canvas: localStorage.getItem('nexus_project_canvas')
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_security_edge_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleClearCache = () => {
    if(confirm('¿Seguro que quieres limpiar todos los datos locales? Se perderán tus proyectos guardados.')) {
      localStorage.clear();
      config.resetAll();
      window.location.reload();
    }
  };

  return (
    <DiseñoBase>
      <div className="space-y-8 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase flex items-center gap-3">
              <Settings className="text-primary-500" />
              Configuración de Operaciones
            </h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2 italic">
              Control Maestro de Infraestructura Jorge H // v3.5
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Sistema Encriptado</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Panel: Identidad y Camuflaje */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-3 italic">
                  <Shield size={16} className="text-primary-500" /> Módulo de Camuflaje e Identidad
                </h3>
              </div>
              <div className="p-8 space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Alias de la Aplicación (Global)</label>
                  <div className="flex gap-3">
                    <Entrada
                      className="flex-1"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      placeholder="Nombre privado..."
                    />
                    <Boton onClick={handleSaveName} className="px-8 min-w-[140px]">
                      {copied ? <Check size={16}/> : <Save size={16}/>}
                      {copied ? 'GUARDADO' : 'APLICAR'}
                    </Boton>
                  </div>
                  <p className="text-[9px] text-slate-600 italic font-bold">Esto cambiará el nombre en el encabezado, PWA y metadatos de búsqueda.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Estilo de Bordes (Lab Default)</label>
                    <div className="flex gap-2">
                      {(['normal', 'thick', 'none'] as const).map(b => (
                        <button
                          key={b}
                          onClick={() => config.setGlobalBorders(b)}
                          className={cn(
                            "flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all",
                            config.globalBorders === b
                              ? "bg-primary-600 border-primary-500 text-white shadow-glow"
                              : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700"
                          )}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Color de Marca Primario</label>
                    <div className="flex gap-2">
                      {['#0ea5e9', '#6366f1', '#a855f7', '#10b981', '#ef4444'].map(c => (
                        <button
                          key={c}
                          onClick={() => config.setPrimaryColor(c)}
                          className={cn(
                            "w-10 h-10 rounded-xl border-2 transition-all",
                            config.primaryColor === c ? "border-white scale-110 shadow-lg" : "border-slate-800 opacity-50"
                          )}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Panel: Datos y Sincronización */}
            <section className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-slate-800 bg-slate-950/50">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-3 italic">
                  <Database size={16} className="text-primary-500" /> Gestión de Datos Locales
                </h3>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={handleExportData}
                  className="flex flex-col items-center justify-center p-8 bg-slate-950 border border-slate-800 rounded-3xl group hover:border-primary-500 transition-all gap-4"
                >
                  <Download size={32} className="text-slate-700 group-hover:text-primary-500" />
                  <div className="text-center">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest block">Exportar Backup</span>
                    <span className="text-[8px] text-slate-600 font-bold uppercase mt-1">Descarga tus proyectos en JSON</span>
                  </div>
                </button>

                <button
                  onClick={() => alert('Función de importación disponible en v4.0')}
                  className="flex flex-col items-center justify-center p-8 bg-slate-950 border border-slate-800 rounded-3xl group hover:border-emerald-500 transition-all gap-4"
                >
                  <Upload size={32} className="text-slate-700 group-hover:text-emerald-500" />
                  <div className="text-center">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest block">Importar Datos</span>
                    <span className="text-[8px] text-slate-600 font-bold uppercase mt-1">Restaurar desde archivo</span>
                  </div>
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar de Estado */}
          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <WifiOff size={18} className="text-primary-500" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Estado Offline</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Soporte PWA</span>
                  <span className="text-[9px] font-black text-emerald-500 uppercase italic">Activo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Service Worker</span>
                  <span className="text-[9px] font-black text-emerald-500 uppercase italic">Corriendo</span>
                </div>

                <Boton
                  variant="secondary"
                  className="w-full py-2 text-[8px] mt-4 border-slate-800 bg-slate-950 text-slate-400"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw size={12} className="mr-2" /> Forzar Recarga
                </Boton>
              </div>
            </div>

            <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-[2.5rem] space-y-6">
              <div className="flex items-center gap-3 border-b border-red-500/10 pb-4">
                <Trash2 size={18} className="text-red-500" />
                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest italic">Zona de Peligro</span>
              </div>
              <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                El reseteo borrará todo el almacenamiento local, incluyendo sesiones, temas personalizados y proyectos del Constructor.
              </p>
              <button
                onClick={handleClearCache}
                className="w-full py-3 bg-red-600/10 text-red-500 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all border border-red-600/20"
              >
                Borrar Todo el Nodo
              </button>
            </div>
          </div>

        </div>
      </div>
    </DiseñoBase>
  );
};
