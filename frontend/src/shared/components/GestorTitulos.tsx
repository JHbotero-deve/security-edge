import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TITULOS: Record<string, string> = {
  '/': 'Laboratorio | Nexus Edge',
  '/login': 'Autenticación | Nexus Edge',
  '/register': 'Nueva Identidad | Nexus Edge',
  '/dashboard': 'Comando Central | Nexus Edge',
  '/incidents': 'Gestión de Incidentes | Nexus Edge',
  '/users': 'Directorio de Identidades | Nexus Edge',
  '/audit': 'Auditoría de Sistemas | Nexus Edge',
  '/monitoring': 'Pulso de Red | Nexus Edge',
  '/notifications': 'Centro de Notificaciones | Nexus Edge',
  '/roles': 'Rangos y Permisos | Nexus Edge',
  '/settings': 'Configuración de Nodo | Nexus Edge',
  '/terminal': 'Terminal Táctica | Nexus Edge',
  '/laboratorio': 'Laboratorio de Suministros | Nexus Edge',
  '/builder': 'Nexus Studio Builder | Nexus Edge',
  '/intelligence': 'Núcleo de Inteligencia | Nexus Edge',
  '/alerts': 'Alertas Críticas | Nexus Edge',
};

export const GestorTitulos = () => {
  const location = useLocation();

  useEffect(() => {
    const titulo = TITULOS[location.pathname] || 'Nexus Security Edge';
    document.title = titulo;
  }, [location]);

  return null;
};
