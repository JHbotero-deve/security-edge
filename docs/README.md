# Security Edge & Nexus Infrastructure

Sistema empresarial para la gestión, monitoreo y auditoría de eventos de ciberseguridad, potenciado por la infraestructura **Nexus Supermarket**.

---

## Descripción

Security Edge es una plataforma web desarrollada para centralizar la administración de la seguridad informática dentro de una organización.

Más de su capacidad analítica, integra el **Nexus Supermarket**: un ecosistema de componentes interactivos de grado empresarial ("Suministros") que permite a los equipos de desarrollo construir interfaces rápidas, seguras y profesionales de forma unilateral.

El proyecto hace parte del ecosistema **JBCore**, diseñado para construir soluciones empresariales modernas, seguras y mantenibles.

---

# Objetivos

- Centralizar la gestión de la seguridad.
- Administrar usuarios y permisos.
- Registrar auditorías del sistema.
- Gestionar incidentes.
- Detectar comportamientos anómalos.
- Monitorear eventos.
- **Nexus Infrastructure:** Proveer un catálogo interactivo de componentes "Plug & Play" para toda la organización.
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
'PostgresSQL'
```

---

# Tecnologías

## Frontend

- React
- TypeScript
- Tailwind CSS

## Backend

- Node.js
- Express
- TypeScript (100%)
- Prisma ORM
- PostgreSQL

## seguridad

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

# Módulos del Backend

Cada módulo vive en `backend/src/modules/<nombre>/` con la estructura fija: `*.validation.ts`, `*.repository.ts`, `*.services.ts`, `*.controller.ts`, `*.routes.ts`, `index.ts`.

| Módulo        |   | Ruta base            | Estado                                                                      |
|---------------|:--|----------------------|-----------------------------------------------------------------------------|
| auth          |   | `/api/auth`          | Registrado (login/registro pendientes de alinear con schema, ver CHANGELOG) |
| admin         |   | `/api/admin`         | Registrado                                                                  |
| users         |   | `/api/users`         | Registrado                                                                  |
| roles         |   | `/api/roles`         | Registrado                                                                  |
| permissions   |   | `/api/permissions`   | Registrado                                                                  |
| audit         |   | `/api/audit`         | Registrado                                                                  |
| dashboard     |   | `/api/dashboard`     | Registrado                                                                  |
| incidents     |   | `/api/incidents`     | Registrado                                                                  |
| notifications |   | `/api/notifications` | Registrado                                                                  |
| settings      |   | `/api/settings`      | Registrado                                                                  |
| monitoring    |   | —                    | Pendiente: archivos con contenido corrupto, ver CHANGELOG                   |
| alerts        |   | —                    | Pendiente de registrar en `index.ts`                                        |

Ver `CHANGELOG.md` para el detalle de inconsistencias conocidas antes de asumir que un módulo está 100% funcional.

---

# Estado del Proyecto

 "Actualmente" el proyecto se encuentra en desarrollo.

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

Proyecto perteneciente al ecosistema **JBCore**.
