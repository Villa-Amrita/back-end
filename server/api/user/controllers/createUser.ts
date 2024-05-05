import { Prisma, PrismaClient, User } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface CreateUserInput {
  id: string
  firstName: string
  familyName: string
  nic: string
  email: string
}

async function createUser({
  id,
  firstName,
  familyName,
  nic,
  email
}: CreateUserInput): Promise<User> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (existingUser) {
      throw new Error("User with this email already exists")
    }

    const newUser = await prisma.user.create({
      data: {
        id: id,
        firstName: firstName,
        familyName: familyName,
        nic: nic,
        email: email
      }
    })

    return newUser
  } catch (error: Error | any) {
    const prismaError = handlePrismaError(error, "User")
    throw new Error(prismaError.error)
  }
}

export default createUser
