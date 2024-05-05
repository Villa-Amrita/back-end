import { PrismaClient, User } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface ViewUserInput {
  id: string
}

async function viewUser({ id }: ViewUserInput): Promise<User> {
  try {
    const viewedUser: User | null = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    if (!viewedUser) {
      throw new Error("A user with the given id does not exist")
    }

    return viewedUser
  } catch (error: Error | any) {
    const prismaError = handlePrismaError(error, "User")
    throw new Error(prismaError.error)
  }
}

export default viewUser
