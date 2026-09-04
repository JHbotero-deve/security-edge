import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuthStore } from './store/autenticacion.estado';

// Carga perezosa por ruta: cada página se descarga solo cuando el usuario
// navega a ella, en vez de venir toda junta en el bundle inicial.
const PaginaLogin = lazy(() => import('./modules/auth/pages/PaginaLogin').then(m => ({ default: m.PaginaLogin })));
const PaginaDashboard = lazy(() => import('./modules/dashboard/pages/PaginaDashboard').then(m => ({ default: m.PaginaDashboard })));
const PaginaIncidentes = lazy(() => import('./modules/incidents/pages/PaginaIncidentes').then(m => ({ default: m.PaginaIncidentes })));
const PaginaUsuarios = lazy(() => import('./modules/users/pages/PaginaUsuarios').then(m => ({ default: m.PaginaUsuarios })));
const PaginaAuditoria = lazy(() => import('./modules/audit/pages/PaginaAuditoria').then(m => ({ default: m.PaginaAuditoria })));
const PaginaMonitoreo = lazy(() => import('./modules/monitoring/pages/PaginaMonitoreo').then(m => ({ default: m.PaginaMonitoreo })));
const PaginaNotificaciones = lazy(() => import('./modules/notifications/pages/PaginaNotificaciones').then(m => ({ default: m.PaginaNotificaciones })));
const PaginaRoles = lazy(() => import('./modules/roles/pages/PaginaRoles').then(m => ({ default: m.PaginaRoles })));
const PaginaConfiguracion = lazy(() => import('./modules/settings/pages/PaginaConfiguracion').then(m => ({ default: m.PaginaConfiguracion })));
const PaginaTerminal = lazy(() => import('./modules/terminal/pages/PaginaTerminal').then(m => ({ default: m.PaginaTerminal })));
const PaginaLaboratorio = lazy(() => import('./modules/playground/pages/PaginaLaboratorio').then(m => ({ default: m.PaginaLaboratorio })));
const PaginaBuilder = lazy(() => import('./modules/builder/pages/PaginaBuilder').then(m => ({ default: m.PaginaBuilder })));
const PaginaInteligencia = lazy(() => import('./modules/assistant/pages/PaginaInteligencia').then(m => ({ default: m.PaginaInteligencia })));
const PaginaAlertas = lazy(() => import('./modules/alerts/pages/PaginaAlertas').then(m => ({ default: m.PaginaAlertas })));

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
      <Suspense fallback={null}>
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
      </Suspense>
    </Router>
  );
}

export default App;
