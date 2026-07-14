import { prisma } from "../../lib/prisma";

export const findAllRepository = async () => {
  return await prisma.alerts.findMany();
};

export const findByIdRepository = async (id: string) => {
  return await prisma.alerts.findUnique({
    where: { id }
  });
};