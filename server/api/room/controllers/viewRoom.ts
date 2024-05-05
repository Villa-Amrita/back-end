import { PrismaClient, Room } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface ViewRoomInput {
  id: number
}

async function viewRoom({ id }: ViewRoomInput): Promise<Room> {
  try {
    const viewedRoom: Room | null = await prisma.room.findUnique({
      where: {
        id: id
      }
    })

    if (!viewedRoom) {
      throw new Error("A room with the given id does not exist")
    }

    return viewedRoom
  } catch (error: Error | any) {
    const prismaError = handlePrismaError(error, "Room")
    throw new Error(prismaError.error)
  }
}

export default viewRoom
