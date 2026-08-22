# Plan de Integración Estética: GAVAC Premium Editorial

Este plan integra la identidad visual de la landing page "Gestión Ganadera" en el proyecto **GAVAC**, elevando el diseño "Pulcro" a una estética **Premium Editorial**. Se abandonan los tonos azules/slate por una paleta orgánica de Verdes Bosque, Cremas y Tipografía Serif elegante.

## Cambios Identificados (Inspiración Landing)
- **Paleta Orgánica**: Verdes profundos (`#1B5E20`), fondos crema (`#F7F4EF`) y hueso (`#EDE8E0`).
- **Tipografía Dual**: Combinación de fuentes Sans-serif modernas para datos y Serif clásicas para títulos.
- **Efectos Premium**: Sombras profundas y suaves, botones con degradados lineales y bordes redondeados de 18px.

## Proposed Changes

### 1. Configuración de Diseño (Tailwind & CSS)
#### [MODIFY] [tailwind.config.ts](file:///C:/Workspace_Dev/1_Proyectos/gavac/frontend/tailwind.config.ts)
- Registrar la nueva paleta de colores: `bosque` (verdes), `crema` (fondos), `carbon` (textos).
- Definir familias de fuentes: `sans` (inter/dm-sans) y `serif` (georgia/dm-serif).

#### [MODIFY] [globals.css](file:///C:/Workspace_Dev/1_Proyectos/gavac/frontend/src/theme/globals.css)
- Actualizar el color de fondo base al tono crema (`#F7F4EF`).
- Importar fuentes desde Google Fonts si la conexión lo permite, o definir fallbacks editoriales.

### 2. Rediseño de Componentes Atómicos
#### [MODIFY] [Boton.tsx](file:///C:/Workspace_Dev/1_Proyectos/gavac/frontend/src/components/Boton.tsx)
- Aplicar degradado lineal verde (`#1B5E20` a `#2E7D32`) por defecto.
- Añadir sombra distintiva verde y redondear a `xl` (18px).

#### [MODIFY] [Entrada.tsx](file:///C:/Workspace_Dev/1_Proyectos/gavac/frontend/src/components/Entrada.tsx)
- Ajustar bordes a un tono hueso sutil.
- Cambiar el color de foco al verde bosque.

### 3. Página de Login (Transformación Total)
#### [MODIFY] [PaginaLogin.tsx](file:///C:/Workspace_Dev/1_Proyectos/gavac/frontend/src/modules/auth/pages/PaginaLogin.tsx)
- **Diseño Dual**: Implementar el patrón de la landing (Ilustración/Color sólido a un lado, Formulario al otro).
- **Branding**: Título GAVAC en tipografía Serif para un look "Premium Editorial".
- **Fondo**: Usar degradados radiales suaves en tonos crema y esmeralda pálido.

## Verification Plan

### Manual Verification
- Verificar que el contraste del texto oscuro sobre el fondo crema sea superior.
- Comprobar que los botones resalten con su nuevo degradado "Forest Green".
- Asegurar que la tarjeta de login tenga la redondez y sombra profunda de la landing original.
