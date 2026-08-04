# Changelog

Todos los cambios relevantes del proyecto **Security Edge** serán documentados en este archivo.

El formato está basado en el estándar **Keep a Changelog** y sigue el esquema de **Versionado Semántico (Semantic Versioning)**.

---

## [Unreleased]

### Changed

- Backend migrado a **100% TypeScript**: se eliminaron todos los archivos `.js` de `backend/src` (middlewares, `constants/http-status`, `utils/logger`, `utils/errors`, `lib/prisma`) y se reescribieron en `.ts` conservando su lógica original.
- `tsconfig.json` reubicado a la raíz de `backend/` (antes estaba mal ubicado en `src/modules/`) y corregido `"module"`/`"moduleResolution"` a `NodeNext` para que coincida con `"type": "module"` de `package.json`.
- `lib/prisma.ts` unificado: se descartó la versión simple y se dejó la que usa `@prisma/adapter-pg` con apagado seguro (`SIGINT`/`SIGTERM`), migrada a TypeScript.
- `shared/base.repository.ts` (antes `repositories/base.repository.ts`) reescrito como clase genérica basada en Prisma (`findAll`, `findOne`, `findById`, `create`, `update`, `delete`), reemplazando la versión anterior basada en `pg.Pool` que no coincidía con cómo la usaban los módulos.
- Corregido `roles.repository.ts`/`roles.services.ts`: nombre de clase inválido `role.repository` renombrado a `RoleRepository`.
- Corregido `auth.repository.ts`: referencia a `prisma.user` (inexistente) cambiada a `prisma.usuario`, según el modelo `Usuario` del schema.
- Corregido `auth.services.ts`: import de `AppError` apuntaba a un archivo inexistente (`utils/appError`); ahora apunta a `utils/errors`.
- Registrados en `index.ts` los routers de 8 módulos que no estaban montados: `users`, `roles`, `permissions`, `audit`, `dashboard`, `incidents`, `notifications`, `settings`.

### Removed

- Eliminadas las carpetas globales sin uso que violaban la arquitectura modular definida (`controllers/`, `routes/`, `validators/`, `schemas/`, `models/`, `shared/responses/`, `config/`, `services/` a nivel raíz de `src/`) y utilidades sueltas sin ninguna referencia en el código (`utils/crypto.js`, `date.js`, `jwt.js`, `password.js`, `response.js`, `token.js`).
- Eliminados repositorios globales duplicados y obsoletos (`repositories/audit.repository.ts`, `role.repository.ts`, `user.repository.ts`), construidos contra la versión anterior de `BaseRepository`.

### Known issues

- Módulo `monitoring`: `monitoring.routes.ts` no contiene un router de Express (tiene pegado el código de un repository) y `monitoring.controller.ts` tiene pegado el `index.ts` del módulo `incidents`. No se conecta a `index.ts` hasta reconstruir ambos archivos.
- Módulo `alerts`: `alerts.routes.ts` tiene el mismo problema — contiene código de repository (`findAllRepository`, `findByIdRepository`) en vez de rutas de Express. Tampoco se puede registrar en `index.ts` hasta reconstruirlo.
- `admin.repository.ts` y `alerts.repository.ts` referencian modelos de Prisma que no existen en `schema.prisma` (`stats`, `auditLogs`, `securityEvents`, `alerts` en plural).
- El modelo `Usuario` no tiene campos `password`, `name` ni `role`, pero `auth.services.ts` los usa para registro/login.
- Las extensiones usadas en los `import` internos de cada módulo son inconsistentes (algunos con `.ts`, otros sin extensión) fuera de lo ya corregido en esta sesión.

### Added

- Estructura inicial del repositorio.
- Organización de carpetas del backend y frontend.
- Configuración base de Git.
- Archivo README del proyecto.
- Configuración de `.gitignore`.
- Configuración de `.editorconfig`.
- Documento de licencia.
- Documentación inicial del proyecto.
- Preparación para Docker.
- Preparación para integración continua con GitHub Actions.

---

## [0.1.0] - 2026-07-04

### Added

- Creación del proyecto Security Edge.
- Definición de la arquitectura inicial.
- Organización modular del backend.
- Preparación del entorno de desarrollo.
- Inicio de la documentación técnica.

