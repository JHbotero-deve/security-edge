import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PaginaLogin />} />

        {/* Rutas sin protección para uso como biblioteca de componentes */}
        <Route path="/" element={<Navigate to="/laboratorio" />} />

        <Route path="/dashboard" element={<PaginaDashboard />} />
        <Route path="/incidents" element={<PaginaIncidentes />} />
        <Route path="/users" element={<PaginaUsuarios />} />
        <Route path="/audit" element={<PaginaAuditoria />} />
        <Route path="/monitoring" element={<PaginaMonitoreo />} />
        <Route path="/notifications" element={<PaginaNotificaciones />} />
        <Route path="/roles" element={<PaginaRoles />} />
        <Route path="/settings" element={<PaginaConfiguracion />} />
        <Route path="/terminal" element={<PaginaTerminal />} />
        <Route path="/laboratorio" element={<PaginaLaboratorio />} />
        <Route path="/builder" element={<PaginaBuilder />} />
        <Route path="/intelligence" element={<PaginaInteligencia />} />

        <Route path="*" element={<Navigate to="/laboratorio" />} />
      </Routes>
    </Router>
  );
}

export default App;
