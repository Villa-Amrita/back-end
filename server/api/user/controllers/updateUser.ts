import { PrismaClient, User } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface UpdateUserInput {
  id: string
  firstName: string
  familyName: string
  nic: string
  email: string
}

async function updateUser({
  id,
  firstName,
  familyName,
  nic,
  email
}: UpdateUserInput): Promise<User> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    if (!existingUser) {
      throw new Error("A user with the provided id does not exist")
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        firstName: firstName,
        familyName: familyName,
        nic: nic,
        email: email
      }
    })

    return updatedUser
  } catch (error: Error | any) {
    const prismaError = handlePrismaError(error, "User")
    throw new Error(prismaError.error)
  }
}

export default updateUser
