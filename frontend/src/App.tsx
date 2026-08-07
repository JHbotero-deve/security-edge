import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/autenticacion.estado';
import { PaginaLogin } from './modules/auth/pages/PaginaLogin';
import { PaginaDashboard } from './modules/dashboard/pages/PaginaDashboard';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <PaginaLogin /> : <Navigate to="/" />} />
        <Route
          path="/"
          element={isAuthenticated ? <PaginaDashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
