import { PrismaClient, Reservation } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface CreateReservationInput {
  roomId: number
  customerId: string
  startDate: Date
  endDate: Date
}

async function createReservation({
  roomId,
  customerId,
  startDate,
  endDate
}: CreateReservationInput): Promise<Reservation> {
  try {
    const newReservation = await prisma.reservation.create({
      data: {
        room: { connect: { id: roomId } },
        customer: { connect: { id: customerId } },
        startDate,
        endDate
      }
    })

    return newReservation
  } catch (error: Error | any) {
    const prismaError = handlePrismaError(error, "Reservation")
    throw new Error(prismaError.error)
  }
}

export default createReservation
