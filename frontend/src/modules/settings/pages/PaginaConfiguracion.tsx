import { useQuery } from '@tanstack/react-query';
import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { configuracionServicio } from '../services/configuracion.servicio';
import { Settings, Save, Server } from 'lucide-react';
import { Boton } from '@/components/Boton';
import { Entrada } from '@/components/Entrada';

export const PaginaConfiguracion = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['configuracion'],
    queryFn: () => configuracionServicio.obtenerTodas(),
  });

  return (
    <DiseñoBase>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Settings className="text-primary-500" />
            Configuración del Sistema
          </h1>
          <p className="text-slate-500 text-sm mt-1">Ajustes globales de la plataforma y parámetros de seguridad.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-800 bg-slate-800/20">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Server size={18} className="text-slate-400" /> General
                </h3>
              </div>
              <div className="p-6 space-y-6">
                {isLoading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-10 bg-slate-800 rounded w-full" />
                    <div className="h-10 bg-slate-800 rounded w-2/3" />
                  </div>
                ) : (
                  data?.data?.map((setting: any) => (
                    <div key={setting.id} className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                      <label className="text-sm font-medium text-slate-300 capitalize">
                        {setting.key.replace('_', ' ')}
                      </label>
                      <div className="md:col-span-2 flex gap-2">
                        <Entrada defaultValue={setting.value} />
                        <Boton variant="secondary" className="px-3">
                          <Save size={16} />
                        </Boton>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-primary-600/10 border border-primary-500/20 p-6 rounded-2xl">
              <h4 className="text-primary-500 font-bold text-sm uppercase tracking-widest mb-3 text-center">Estado del Entorno</h4>
              <ul className="space-y-3">
                <li className="flex justify-between text-xs font-medium">
                  <span className="text-slate-400">Versión:</span>
                  <span className="text-white">v0.1.0-beta</span>
                </li>
                <li className="flex justify-between text-xs font-medium">
                  <span className="text-slate-400">Modo:</span>
                  <span className="text-emerald-500 font-bold uppercase">Producción</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DiseñoBase>
  );
};
