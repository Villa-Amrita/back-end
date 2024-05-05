import { PrismaClient, Room } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

async function viewAllRooms(): Promise<Room[]> {
  try {
    const allRooms: Room[] = await prisma.room.findMany()
    return allRooms
  } catch (error: Error | any) {
    const prismaError = handlePrismaError(error, "Room")
    throw new Error(prismaError.error)
  }
}

export default viewAllRooms
