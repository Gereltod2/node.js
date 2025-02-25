const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      email: "galaa@example.com",
      name: "Galaa",
    },
  });
  console.log("Created new user:", newUser);

  const allUsers = await prisma.user.findMany();
  console.log("All users:", allUsers);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
