# Security Edge

Sistema empresarial para la gestión, monitoreo y auditoría de eventos de ciberseguridad.

---

## Descripción

Security Edge es una plataforma web desarrollada para centralizar la administración de la seguridad informática dentro de una organización.

El sistema integra procesos de autenticación, autorización, auditoría, monitoreo, gestión de incidentes y administración de usuarios mediante una arquitectura modular, escalable y orientada a buenas prácticas de desarrollo.

El proyecto hace parte del ecosistema **JB Core**, diseñado para construir soluciones empresariales modernas, seguras y mantenibles.

---

# Objetivos

- Centralizar la gestión de la seguridad.
- Administrar usuarios y permisos.
- Registrar auditorías del sistema.
- Gestionar incidentes.
- Detectar comportamientos anómalos.
- Monitorear eventos.
- Facilitar futuras integraciones con inteligencia artificial.
- Mantener una arquitectura limpia y escalable.

---

# Arquitectura General

```text
Frontend (React + Vite)
        │
        ▼
API REST (Express)
        │
        ▼
Servicios de Negocio
        │
        ▼
Repositorios
        │
        ▼
Prisma ORM
        │
        ▼
PostgreSQL
```

---

# Tecnologías

## Frontend

- React
- Vite
- JavaScript
- Tailwind CSS

## Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL

## Seguridad

- JWT
- Helmet
- CORS
- bcrypt
- Zod
- Multer

## DevOps

- Docker
- Docker Compose
- Git
- GitHub Actions

---

# Estructura del Proyecto

```text
security-edge/
│
├── backend/
├── frontend/
├── database/
├── docker/
├── docs/
├── packages/
├── scripts/
├── tests/
├── tools/
├── backups/
├── logs/
└── .github/
```

---

# Estado del Proyecto

Actualmente el proyecto se encuentra en desarrollo.

Las primeras etapas contemplan:

- Arquitectura base
- Backend
- Frontend
- Base de datos
- Docker
- Automatización CI/CD
- Documentación

---

# Documentación

Toda la documentación técnica estará ubicada dentro del directorio:

```
docs/
```

incluyendo:

- Arquitectura
- API
- Base de datos
- Diagramas
- Manuales
- Guías de despliegue

---

# Licencia

La licencia del proyecto se encuentra en el archivo `LICENSE`.

---

# Autor

**Jorge Botero**

Proyecto perteneciente al ecosistema **JB Core**.
