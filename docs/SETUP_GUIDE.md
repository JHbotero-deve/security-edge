# Setup Guide para security-edge

## Docker No Instalado

### Solución 1: Instalar Docker Desktop (Recomendado)

**Para Windows 10/11:**

1. Descarga: https://www.docker.com/products/docker-desktop
2. Instala normalmente (como cualquier programa)
3. Reinicia Windows
4. Abre PowerShell y verifica:

```powershell
docker --version
docker-compose --version
```

### Solución 2: Usar Línea de Comandos Sin Docker

Si no quieres instalar Docker ahora, puedes trabajar sin BD local:

```powershell
# Solo backend (sin BD)
cd backend
npm install
npm run dev
# Accede a http://localhost:3000/health
```

```powershell
# Solo frontend
cd frontend
npm install
npm run dev
# Accede a http://localhost:5173
```

### Solución 3: PostgreSQL Directamente (Sin Docker)

1. Descarga PostgreSQL desde https://www.postgresql.org/download/windows/
2. Instala y recuerda la contraseña
3. Crea BD:

```powershell
# PowerShell como Admin
psql -U postgres -c "CREATE DATABASE security_edge;"
```

4. Actualiza `.env`:

```
DATABASE_URL=postgresql://postgres:TU_PASSWORD@localhost:5432/security_edge?schema=public
```

5. Ejecuta migraciones:

```powershell
cd backend
npx prisma migrate dev --name init
npm run dev
```

---

## Comandos PowerShell Correctos

### Navegar al proyecto
```powershell
cd C:\Workspace_Dev\1_Proyectos\security-edge
```

### Ver estructura
```powershell
tree backend\src\modules /L 2
tree frontend\src /L 2
```

### Instalar dependencias
```powershell
cd backend
npm install

cd ..\frontend
npm install
```

### Ver archivos de configuración
```powershell
cat backend\.env
cat backend\prisma\schema.prisma
cat docker-compose.yml
```

### Ver documentación generada
```powershell
cat docs\BOILERPLATE_GUIDE.md
cat SECURITY_NOTES.md
```

### Limpiar node_modules
```powershell
Remove-Item -Recurse -Force backend\node_modules
Remove-Item -Recurse -Force frontend\node_modules
```

---

## Próximos Pasos

**Opción A: Con Docker (Recomendado para producción)**
1. Instala Docker Desktop
2. `docker-compose up database`
3. `cd backend && npx prisma migrate dev`
4. `npm run dev`

**Opción B: Sin Docker (Para desarrollo sin BD)**
1. Trabaja solo backend/frontend
2. Las APIs no tendrán BD hasta que configures una

**Opción C: Con PostgreSQL Local**
1. Instala PostgreSQL
2. Configura `.env`
3. `npx prisma migrate dev`
4. `npm run dev`

---

¿Cuál prefieres?
