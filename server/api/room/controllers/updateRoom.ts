import { PrismaClient, Room } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface UpdateRoomInput {
  id: number
  roomName: string
  roomSize: number
  roomDescription: string
  roomConditions: string
  roomPrice: number
}

async function updateRoom({
  id,
  roomName,
  roomSize,
  roomDescription,
  roomConditions,
  roomPrice
}: UpdateRoomInput): Promise<Room> {
  try {
    const existingRoom = await prisma.room.findUnique({
      where: {
        id: id
      }
    })

    if (!existingRoom) {
      throw new Error("A room with the provided id does not exist")
    }

    const updatedRoom = await prisma.room.update({
      where: {
        id: id
      },
      data: {
        roomName: roomName,
        roomSize: roomSize,
        roomDescription: roomDescription,
        roomConditions: roomConditions,
        roomPrice: roomPrice
      }
    })

    return updatedRoom
  } catch (error: Error | any) {
    const prismaError = handlePrismaError(error, "Room")
    throw new Error(prismaError.error)
  }
}

export default updateRoom
