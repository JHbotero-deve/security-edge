import { DiseñoBase } from '@/shared/components/DiseñoBase';
import { Terminal, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const CommandItem = ({ label, command }: { label: string; command: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between group">
      <div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{label}</p>
        <code className="text-sm font-mono text-emerald-400">{command}</code>
      </div>
      <button
        onClick={handleCopy}
        className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"
      >
        {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
      </button>
    </div>
  );
};

export const PaginaTerminal = () => {
  return (
    <DiseñoBase>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Terminal className="text-primary-500" />
            Consola y Comandos
          </h1>
          <p className="text-slate-500 text-sm mt-1">Referencia rápida de comandos para el mantenimiento del ecosistema.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Gestión de Paquetes (NPM)</h2>
            <CommandItem label="Instalar Dependencias" command="npm install" />
            <CommandItem label="Correr Backend Dev" command="npm run dev" />
            <CommandItem label="Correr Frontend Dev" command="npm run dev" />
            <CommandItem label="Limpiar Cache NPM" command="npm cache clean --force" />
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Herramientas de Ejecución (NPX)</h2>
            <CommandItem label="Prisma Studio" command="npx prisma studio" />
            <CommandItem label="Prisma Generate" command="npx prisma generate" />
            <CommandItem label="Migración DB" command="npx prisma migrate dev" />
            <CommandItem label="Ejecutar Seed (Data)" command="node prisma/seed.js" />
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Infraestructura (Docker)</h2>
            <CommandItem label="Levantar Todo" command="docker-compose up -d" />
            <CommandItem label="Detener Todo" command="docker-compose down" />
            <CommandItem label="Ver Logs Backend" command="docker logs security-edge-backend -f" />
            <CommandItem label="Reconstruir Imágenes" command="docker-compose up -d --build" />
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Base de Datos</h2>
            <CommandItem label="Acceder a Postgres" command="docker exec -it security-edge-db psql -U postgres" />
            <CommandItem label="Backup DB" command="docker exec -t security-edge-db pg_dumpall -c -U postgres > backup.sql" />
          </section>
        </div>
      </div>
    </DiseñoBase>
  );
};
