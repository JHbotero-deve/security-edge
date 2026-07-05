# Catálogo de UI

Usa este documento para registrar elementos de la interfaz (botones, formularios de inicio de sesión, tablas, rutas, etc.) para que sean fácilmente localizables por el equipo.

Cómo usar

- Añade una entrada por componente o área UI bajo las etiquetas apropiadas.
- Campos:
  - Nombre: nombre corto
  - Ruta: ubicación en el repositorio
  - Descripción: qué es / dónde se usa
  - Etiquetas: etiquetas separadas por comas (botón, login, tabla, ruta, auth, formulario, nav)
  - Notas: cualquier nota o guía adicional

Ejemplo de entrada

- Nombre: BotonPrincipal
- Ruta: src/components/BotonPrincipal.jsx
- Descripción: Botón primario usado en formularios y modales.
- Etiquetas: botón, primario, formulario
- Notas: Usa la variable CSS --btn-primary

Secciones

- # inicio de sesión
- # botón
- # tabla
- # ruta
- # formulario
- # barra-de-navegación
- # otros

Mantenimiento del índice

Hay un script Node en tools/ui-indexer.js que escanea los archivos del repositorio buscando palabras clave comunes y produce docs/ui-search/ui-index.json.

Ejecutarlo localmente

1. Instalar dependencias:

   npm install

2. Generar el índice:

   npm run build-ui-index

El indexador admite un archivo de configuración en tools/ui-indexer.config.json para personalizar palabras clave (keywords), rutas a ignorar, extensiones y el número máximo de fragmentos por archivo. Si no existe el archivo de configuración, se usan valores por defecto.

Campos en el índice generado (docs/ui-search/ui-index.json)

- generated_at: timestamp ISO
- generated_from_config: indica si se usó el archivo de configuración
- results: arreglo de coincidencias con campos:
  - path
  - tags
  - matches_count
  - file_size
  - snippets (array de {line, text})

Integración con CI

Puedes añadir un workflow de GitHub Actions que ejecute `npm run build-ui-index` en los pushes a main y haga commit del archivo actualizado docs/ui-search/ui-index.json. Así el índice se mantiene actualizado para todos.
