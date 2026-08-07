import { Header } from '@/components/Header';
import { DataTable } from '@/components/DataTable';
import { Activity, ShieldAlert, Users, Database } from 'lucide-react';

export const DashboardPage = () => {
  const stats = [
    { label: 'Incidentes Activos', value: '12', icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Usuarios Activos', value: '48', icon: Users, color: 'text-primary-500', bg: 'bg-primary-500/10' },
    { label: 'Eventos de Red', value: '2.4k', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Logs Auditados', value: '15.8k', icon: Database, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  const recentIncidents = [
    { id: 1, title: 'Intento de Brute Force', severity: 'HIGH', status: 'OPEN', date: '2026-08-06 22:45' },
    { id: 2, title: 'Detección de Malware', severity: 'CRITICAL', status: 'IN_PROGRESS', date: '2026-08-06 21:12' },
    { id: 3, title: 'Acceso no autorizado', severity: 'MEDIUM', status: 'RESOLVED', date: '2026-08-06 20:05' },
  ];

  const columns = [
    { header: 'ID', key: 'id' },
    { header: 'Evento', key: 'title' },
    {
      header: 'Severidad',
      key: 'severity',
      render: (item: any) => (
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
          item.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-500' :
          item.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'
        }`}>
          {item.severity}
        </span>
      )
    },
    {
      header: 'Estado',
      key: 'status',
      render: (item: any) => (
        <span className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'RESOLVED' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></span>
          {item.status.replace('_', ' ')}
        </span>
      )
    },
    { header: 'Fecha', key: 'date' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header />

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-8">
        <section>
          <h2 className="text-xl font-bold text-white mb-6">Resumen de Seguridad</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bg} ${stat.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                    <stat.icon size={24} />
                  </div>
                </div>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Últimos Incidentes</h2>
            <button className="text-primary-500 text-sm font-semibold hover:underline">Ver todo</button>
          </div>
          <DataTable columns={columns} data={recentIncidents} />
        </section>
      </main>
    </div>
  );
};
