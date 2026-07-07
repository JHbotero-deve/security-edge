import { prisma } from "../../lib/prisma.js";

export async function findUserByEmailRepository(email) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function createUserRepository(data) {
  return await prisma.user.create({ data });
}
