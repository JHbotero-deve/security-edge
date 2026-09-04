# Blueprint de Arquitectura Modular - SECURITY EDGE

Este documento define el estándar técnico obligatorio para la creación de módulos en el backend. Cada módulo debe ser independiente, reutilizable y seguir estrictamente la estructura de 6 archivos.

---

## 1. Estructura de Archivos
Todos los módulos residen en `src/modules/{nombre_modulo}/`.

1.  `{modulo}.validation.ts`: Esquemas de validación con Zod.
2.  `{modulo}.repository.ts`: Clase que hereda de `BaseRepository` para acceso a datos.
3.  `{modulo}.services.ts`: Clase con la lógica de negocio (agnóstica a HTTP).
4.  `{modulo}.controller.ts`: Clase que maneja la entrada/salida HTTP y validación.
5.  `{modulo}.routes.ts`: Definición de rutas de Express.
6.  `index.ts`: Punto de exportación limpio.

---

## 2. Reglas de Implementación

### 2.1. Nomenclatura
- **Clases:** PascalCase (ej: `UserRepository`, `UserService`).
- **Instancias:** camelCase (ej: `this.repository = new UserRepository()`).
- **Archivos:** kebab-case con sufijo (ej: `auth.controller.ts`).

### 2.2. Validaciones (Zod)
Cada endpoint debe tener un esquema que valide por separado `body`, `params` y `query` si es necesario.
```typescript
export const schema = z.object({
  body: z.object({ ... }),
  params: z.object({ ... })
});
```

### 2.3. Repositorios
Deben heredar de `BaseRepository` y usar el modelo correspondiente de Prisma.
- **Prohibido:** Lógica de negocio dentro del repositorio.
- **Permitido:** Consultas complejas de Prisma, agregaciones y filtros específicos.

### 2.4. Servicios
- Deben inyectar el repositorio en el constructor.
- Deben lanzar errores específicos (`AppError`) para que el middleware los capture.
- No deben conocer nada de `req` o `res` de Express.

### 2.5. Controladores
- Deben usar funciones de flecha para los métodos (evita problemas de `this`).
- Deben devolver siempre un objeto con la estructura: `{ success: true, data: ... }`.
- Deben capturar errores mediante `next(error)`.

### 2.6. Rutas e Imports
- **Imports Internos:** Siempre deben incluir la extensión `.js` (ej: `./user.service.js`).
- **Protección:** Aplicar middlewares de `jwtMiddleware` y `roleMiddleware` por defecto.

---

## 3. Ejemplo de Estándar de Respuesta
```json
{
  "success": true,
  "data": { ... }
}
```

## 4. Flujo de Trabajo para Nuevos Módulos
1. Analizar `schema.prisma` para verificar el modelo.
2. Crear los 6 archivos siguiendo este blueprint.
3. Registrar el router en `src/index.ts`.
