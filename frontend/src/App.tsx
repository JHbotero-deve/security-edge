import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuthStore } from './store/autenticacion.estado';
import { PaginaLogin } from './modules/auth/pages/PaginaLogin';
import { PaginaDashboard } from './modules/dashboard/pages/PaginaDashboard';
import { PaginaIncidentes } from './modules/incidents/pages/PaginaIncidentes';
import { PaginaUsuarios } from './modules/users/pages/PaginaUsuarios';
import { PaginaAuditoria } from './modules/audit/pages/PaginaAuditoria';
import { PaginaMonitoreo } from './modules/monitoring/pages/PaginaMonitoreo';
import { PaginaNotificaciones } from './modules/notifications/pages/PaginaNotificaciones';
import { PaginaRoles } from './modules/roles/pages/PaginaRoles';
import { PaginaConfiguracion } from './modules/settings/pages/PaginaConfiguracion';
import { PaginaTerminal } from './modules/terminal/pages/PaginaTerminal';
import { PaginaLaboratorio } from './modules/playground/pages/PaginaLaboratorio';
import { PaginaBuilder } from './modules/builder/pages/PaginaBuilder';
import { PaginaInteligencia } from './modules/assistant/pages/PaginaInteligencia';
import { PaginaAlertas } from './modules/alerts/pages/PaginaAlertas';

// Rutas que en el backend exigen rol ADMIN (users, roles, audit, settings).
// Antes solo se ocultaban del menú visualmente; alguien que escribiera la
// URL directamente igual entraba a la pantalla. Este guardián bloquea de verdad.
function RutaAdmin({ children }: { children: ReactNode }) {
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PaginaLogin />} />

        {/* Página Principal: Ahora el Laboratorio es la raíz para un link más limpio */}
        <Route path="/" element={<PaginaLaboratorio />} />

        <Route path="/dashboard" element={<PaginaDashboard />} />
        <Route path="/incidents" element={<PaginaIncidentes />} />
        <Route path="/users" element={<RutaAdmin><PaginaUsuarios /></RutaAdmin>} />
        <Route path="/audit" element={<RutaAdmin><PaginaAuditoria /></RutaAdmin>} />
        <Route path="/monitoring" element={<PaginaMonitoreo />} />
        <Route path="/notifications" element={<PaginaNotificaciones />} />
        <Route path="/roles" element={<RutaAdmin><PaginaRoles /></RutaAdmin>} />
        <Route path="/settings" element={<RutaAdmin><PaginaConfiguracion /></RutaAdmin>} />
        <Route path="/terminal" element={<PaginaTerminal />} />
        <Route path="/laboratorio" element={<PaginaLaboratorio />} />
        <Route path="/builder" element={<PaginaBuilder />} />
        <Route path="/intelligence" element={<PaginaInteligencia />} />
        <Route path="/alerts" element={<PaginaAlertas />} />

        <Route path="*" element={<Navigate to="/laboratorio" />} />
      </Routes>
    </Router>
  );
}

export default App;
