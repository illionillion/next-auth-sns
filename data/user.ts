import { prisma } from "@/utils/prisma"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  } catch (error) {
    console.error("getUserByEmail: ", error)
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  } catch (error) {
    console.error("getUserById: ", error)
    return null
  }
}

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
  } catch (error) {
    console.error("createUser: ", error)
  }
}
