import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando siembra de base de datos (Seeding)...");

  // Limpiar datos existentes
  await prisma.auditLog.deleteMany();
  await prisma.incident.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.monitoring.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.setting.deleteMany();

  // 1. Roles
  const adminRole = await prisma.role.create({ data: { name: "ADMIN" } });
  const operatorRole = await prisma.role.create({ data: { name: "OPERATOR" } });
  const userRole = await prisma.role.create({ data: { name: "USER" } });

  // 2. Usuarios
  const hashedPassword = await bcrypt.hash("Admin123!", 10);
  const adminUser = await prisma.usuario.create({
    data: {
      username: "admin",
      email: "admin@securityedge.com",
      password: hashedPassword,
      name: "Administrador del Sistema",
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  const operatorUser = await prisma.usuario.create({
    data: {
      username: "operador1",
      email: "operador1@securityedge.com",
      password: hashedPassword,
      name: "Operador de Seguridad",
      role: "OPERATOR",
      status: "ACTIVE",
    },
  });

  // 3. Incidentes
  await prisma.incident.createMany({
    data: [
      { title: "Intento de fuerza bruta detectado", description: "Múltiples fallos de login desde IP externa", severity: "HIGH", status: "OPEN" },
      { title: "Escaneo de puertos", description: "Detección de escaneo masivo en el segmento 10.0.0.x", severity: "MEDIUM", status: "IN_PROGRESS" },
      { title: "Detección de Malware", description: "Archivo sospechoso detectado en el servidor de archivos", severity: "CRITICAL", status: "RESOLVED" },
    ],
  });

  // 4. Monitoreo
  await prisma.monitoring.createMany({
    data: [
      { type: "CPU_USAGE", value: "45%", status: "NORMAL" },
      { type: "MEM_USAGE", value: "2.4GB", status: "NORMAL" },
      { type: "DISK_USAGE", value: "88%", status: "WARNING" },
    ],
  });

  // 5. Ajustes
  await prisma.setting.createMany({
    data: [
      { key: "SYSTEM_NAME", value: "Security Edge Enterprise" },
      { key: "SESSION_TIMEOUT", value: "3600" },
      { key: "MAINTENANCE_MODE", value: "false" },
    ],
  });

  // 6. Auditoría
  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: "DATABASE_SEED",
      details: "Siembra inicial de datos realizada con éxito",
      ipAddress: "127.0.0.1",
    },
  });

  console.log("Base de datos sembrada exitosamente.");
  console.log(`- Usuario Admin: admin@securityedge.com / Admin123!`);
}

main()
  .catch((e) => {
    console.error("Error en el Seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
