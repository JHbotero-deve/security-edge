# Guía de Contribución

Gracias por tu interés en contribuir al proyecto **Security Edge**.

Este documento establece las normas y buenas prácticas para mantener un desarrollo consistente, seguro y organizado.

---

# Objetivo

Garantizar que todas las contribuciones mantengan los estándares de calidad del proyecto.

---

# Requisitos

Antes de realizar cualquier cambio asegúrate de:

- Tener Git instalado.
- Tener Node.js en una versión LTS.
- Tener Docker instalado.
- Tener PostgreSQL disponible o utilizar Docker Compose.
- Utilizar Visual Studio Code como editor recomendado.

---

# Flujo de Trabajo

El desarrollo seguirá el siguiente flujo:

1. Actualizar la rama principal.
2. Crear una nueva rama de trabajo.
3. Implementar la funcionalidad.
4. Ejecutar pruebas.
5. Documentar los cambios.
6. Crear el commit.
7. Abrir un Pull Request.

---

# Convención de Ramas

Utilizar nombres descriptivos.

Ejemplos:

```text
feature/authentication
feature/dashboard
feature/users

fix/login-error
fix/security-validation

docs/readme-update

refactor/user-service
```

---

# Convención de Commits

Se utilizará una estructura basada en Conventional Commits.

Ejemplos:

```text
feat: add authentication module
fix: correct jwt validation
docs: update README
refactor: improve user service
style: format project
test: add authentication tests
chore: update dependencies
```

---

# Estándares de Código

- Mantener una arquitectura modular.
- Utilizar nombres descriptivos.
- Evitar duplicación de código.
- Documentar funciones complejas.
- Mantener archivos pequeños y reutilizables.
- Validar todas las entradas del usuario.
- Aplicar principios SOLID cuando corresponda.

---

# Pruebas

Antes de enviar cambios se debe verificar:

- El proyecto compila correctamente.
- No existen errores de lint.
- Las pruebas automatizadas son satisfactorias.
- No se rompe funcionalidad existente.

---

# Pull Requests

Cada Pull Request debe incluir:

- Descripción del cambio.
- Objetivo.
- Módulos afectados.
- Evidencia de pruebas realizadas.
- Documentación actualizada cuando sea necesario.

---

# Código de Conducta

Todos los colaboradores deben respetar el archivo `CODE_OF_CONDUCT.md`.

---

# Seguridad

Las vulnerabilidades deberán reportarse siguiendo el procedimiento definido en `SECURITY.md`.

---

# Contacto

**Proyecto:** Security Edge

**Autor:** Jorge Botero
