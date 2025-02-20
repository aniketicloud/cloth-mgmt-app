import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Seed default categories
  await prisma.category.upsert({
    where: { name: "Uncategorised" },
    update: {},
    create: {
      name: "Uncategorised",
      isDefault: true,
    },
  });

  await prisma.category.upsert({
    where: { name: "Shirt" },
    update: {},
    create: { name: "Shirt" },
  });

  await prisma.category.upsert({
    where: { name: "Pant" },
    update: {},
    create: { name: "Pant" },
  });

  // Seed default locations
  await prisma.location.upsert({
    where: { name: "Hometown" },
    update: {},
    create: { name: "Hometown" },
  });

  await prisma.location.upsert({
    where: { name: "Work" },
    update: {},
    create: { name: "Work" },
  });

  // Seed a test user (for MVP1 hardcoded login)
  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      password: "password123", // Insecure! Only for MVP1 development
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
