# JB Proyecto Primaria

Documento de referencia inicial del proyecto **Security Edge**, dentro del ecosistema **JB Core**.

---

## Qué es este documento

Punto de entrada rápido antes de tocar código. Resume qué es el proyecto, cómo está organizado y a qué documento ir según lo que necesites.

---

## Resumen del proyecto

Security Edge centraliza la gestión, monitoreo y auditoría de eventos de ciberseguridad: autenticación, autorización, auditoría, monitoreo, gestión de incidentes y administración de usuarios.

## Stack

- **Frontend:** React, Vite, JavaScript, Tailwind CSS
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL
- **Seguridad:** JWT, Helmet, CORS, bcrypt, Zod, Multer
- **DevOps:** Docker, Docker Compose, Git, GitHub Actions

## Estructura de carpetas

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

## Dónde buscar cada cosa

| Necesito... | Ir a |
|---|---|
| Instalar y correr el proyecto | `ENTORNO.md` |
| Entender la arquitectura completa | `README.md` |
| Reportar una vulnerabilidad | `SECURITY.md` |
| Hacer un commit o PR | `CONTRIBUTING.md` |
| Ver qué cambió entre versiones | `CHANGELOG.md` |
| Normas de convivencia | `CODE_OF_CONDUCT.md` |

## Estado actual

En desarrollo. Etapas en curso: arquitectura base, backend, frontend, base de datos, Docker, CI/CD, documentación.

## Autor

**Jorge Botero** — ecosistema **JB Core**.
