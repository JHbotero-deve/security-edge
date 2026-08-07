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

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <PaginaLogin /> : <Navigate to="/" />} />

        {/* Rutas Protegidas */}
        <Route
          path="/"
          element={isAuthenticated ? <PaginaDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/incidents"
          element={isAuthenticated ? <PaginaIncidentes /> : <Navigate to="/login" />}
        />
        <Route
          path="/users"
          element={isAuthenticated ? <PaginaUsuarios /> : <Navigate to="/login" />}
        />
        <Route
          path="/audit"
          element={isAuthenticated ? <PaginaAuditoria /> : <Navigate to="/login" />}
        />
        <Route
          path="/monitoring"
          element={isAuthenticated ? <PaginaMonitoreo /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifications"
          element={isAuthenticated ? <PaginaNotificaciones /> : <Navigate to="/login" />}
        />
        <Route
          path="/roles"
          element={isAuthenticated ? <PaginaRoles /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={isAuthenticated ? <PaginaConfiguracion /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
