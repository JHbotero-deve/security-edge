import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "../src/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");
  await prisma.auditLog.deleteMany();
  await prisma.securityEvent.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash("Admin@12345", 10);
  const admin = await prisma.user.create({
    data: {
      name: "System Administrator",
      email: "admin@securityedge.io",
      passwordHash: adminPassword,
      role: "ADMIN",
      status: "ACTIVE",
      department: "IT Security",
      emailVerified: true,
    },
  });
  const analystPassword = await bcrypt.hash("Analyst@12345", 10);
  const analyst = await prisma.user.create({
    data: {
      name: "Security Analyst",
      email: "analyst@securityedge.io",
      passwordHash: analystPassword,
      role: "ANALYST",
      status: "ACTIVE",
      department: "Security",
      emailVerified: true,
    },
  });
  const viewerPassword = await bcrypt.hash("Viewer@12345", 10);
  const viewer = await prisma.user.create({
    data: {
      name: "Security Viewer",
      email: "viewer@securityedge.io",
      passwordHash: viewerPassword,
      role: "VIEWER",
      status: "ACTIVE",
      department: "Operations",
      emailVerified: true,
    },
  });
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: "USER_LOGIN",
      resource: "Authentication",
      details: "Admin user logged in via web interface",
      ipAddress: "192.168.1.100",
      status: "SUCCESS",
    },
  });

  await prisma.securityEvent.create({
    data: {
      userId: admin.id,
      eventType: "LOGIN_SUCCESS",
      severity: "LOW",
      description: "Admin login successful",
      ipAddress: "192.168.1.100",
      resolved: true,
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log("\n📊 Created users:");
  console.log(`  - Admin: ${admin.email}`);
  console.log(`  - Analyst: ${analyst.email}`);
  console.log(`  - Viewer: ${viewer.email}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
