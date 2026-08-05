import { prisma } from "../../lib/prisma.js";

export const findAllRepository = async () => {
  return await prisma.alert.findMany();
};

export const findByIdRepository = async (id: number) => {
  return await prisma.alert.findUnique({
    where: { id }
  });
};
