import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const count = await prisma.usuario.count();
  console.log(`Usuarios en la base de datos: ${count}`);
}
main().finally(() => prisma.$disconnect());
