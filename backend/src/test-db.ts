import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Usamos 'usuario' (singular) como indica el error de Prisma
    const userCount = await prisma.usuario.count();
    console.log('✅ Conexión exitosa. Número de usuarios en DB:', userCount);
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
  } finally {
    // Corregimos la sintaxis de 
    await prisma.$disconnect();
  }
}

main();
