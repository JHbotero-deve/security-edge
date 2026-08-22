import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/autenticacion.estado';
import { autenticacionServicio } from '../services/autenticacion.servicio';
import { Entrada } from '@/components/Entrada';
import { Boton } from '@/components/Boton';
import { ShieldCheck } from 'lucide-react';

export const PaginaLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data } = await autenticacionServicio.login({ email, password });
      setAuth(data.user, data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary-500/20">
            <ShieldCheck className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Security Edge</h1>
          <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-semibold">Enterprise Protection</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Entrada
            label="Correo Electrónico"
            type="email"
            placeholder="usuario@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Entrada
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <Boton type="submit" className="w-full py-3" isLoading={isLoading}>
            Ingresar al Sistema
          </Boton>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">
            © 2026 Security Edge. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};
