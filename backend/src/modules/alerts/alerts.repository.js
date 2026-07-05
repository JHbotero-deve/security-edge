import prisma from "../../config/database.js";

export async function findAllRepository() {
  return await prisma.alerts.findMany();
}

export async function findByIdRepository(id) {
  return await prisma.alerts.findUnique({ where: { id } });
}
