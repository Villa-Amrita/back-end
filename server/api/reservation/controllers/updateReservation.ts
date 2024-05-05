import { PrismaClient, Reservation } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface UpdateReservationInput {
  id: number
  roomId?: number
  customerId?: string
  startDate?: Date
  endDate?: Date
}

async function updateReservation({
  id,
  roomId,
  customerId,
  startDate,
  endDate
}: UpdateReservationInput): Promise<Reservation> {
  try {
    const existingReservation = await prisma.reservation.findUnique({
      where: {
        id
      }
    })

    if (!existingReservation) {
      throw new Error("Reservation not found")
    }

    const updatedReservation = await prisma.reservation.update({
      where: {
        id
      },
      data: {
        room: roomId ? { connect: { id: roomId } } : undefined,
        customer: customerId ? { connect: { id: customerId } } : undefined,
        startDate,
        endDate
      }
    })

    return updatedReservation
  } catch (error: Error | any) {
    const prismaError = handlePrismaError(error, "Reservation")
    throw new Error(prismaError.error)
  }
}

export default updateReservation
