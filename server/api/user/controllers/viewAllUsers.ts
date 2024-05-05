import { PrismaClient, User } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

async function viewAllUsers(): Promise<User[]> {
  try {
    const allUsers: User[] = await prisma.user.findMany()
    return allUsers
  } catch (error: Error | any) {
    const prismaError = handlePrismaError(error, "User")
    throw new Error(prismaError.error)
  }
}

export default viewAllUsers
