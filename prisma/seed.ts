// prisma/seed.ts
import { PrismaClient } from "@prisma/client"
import { hashPassword } from "@/utils/password"
const prisma = new PrismaClient()

async function main() {
  // Example: Create initial users
  await prisma.user.createMany({
    data: [
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashPassword("password1"),
      },
      {
        name: "Jane Doe",
        email: "jane@example.com",
        password: hashPassword("password2"),
      },
    ],
  })

  // Add other seeding logic here
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
