# Instalación Docker Desktop - Windows

## Paso 1: Descargar

Abre este link en tu navegador:
https://www.docker.com/products/docker-desktop

Click en "Download for Windows"

## Paso 2: Instalar

1. Ejecuta el instalador (Docker Desktop Installer.exe)
2. Acepta los términos
3. Deja opciones por defecto
4. Click "Install"
5. Espera a que termine (puede tomar 5-10 minutos)

## Paso 3: Reiniciar Windows

Después de instalar Docker te pedirá reiniciar.
Reinicia tu computadora.

## Paso 4: Verificar Instalación

Abre PowerShell y ejecuta:

```powershell
docker --version
docker-compose --version
```

Deberías ver algo como:
```
Docker version 27.0.0, build abc123
Docker Compose version v2.28.0
```

## Paso 5: Iniciar Proyecto

Una vez verificado, en PowerShell:

```powershell
cd C:\Workspace_Dev\1_Proyectos\security-edge
docker-compose up database
```

En otra terminal:

```powershell
cd C:\Workspace_Dev\1_Proyectos\security-edge\backend
npm install
npx prisma migrate dev --name init
npm run dev
```

En una tercera terminal:

```powershell
cd C:\Workspace_Dev\1_Proyectos\security-edge\frontend
npm install
npm run dev
```

Luego accede a:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Database: localhost:5432

---

¿Necesitas ayuda durante la instalación?
