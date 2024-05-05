import { PrismaClient, User } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface ViewUserByEmailInput {
  email: string
}

async function viewUserByEmail({ email }: ViewUserByEmailInput): Promise<User> {
  try {
    const viewedUser: User | null = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (!viewedUser) {
      throw new Error("A user with the given email does not exist")
    }

    return viewedUser
  } catch (error: Error | any) {
    const prismaError = handlePrismaError(error, "User")
    throw new Error(prismaError.error)
  }
}

export default viewUserByEmail
