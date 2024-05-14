import { PrismaClient, Reservation, Status } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface CreateReservationInput {
  roomId: number
  customerId: string
  startDate: Date
  endDate: Date
  specialRequests: string
  status: string
}

async function createReservation({
  roomId,
  customerId,
  startDate,
  endDate,
  specialRequests,
  status
}: CreateReservationInput): Promise<Reservation> {
  try {
    const reservationStatus: Status = status as Status
    const newReservation = await prisma.reservation.create({
      data: {
        room: { connect: { id: roomId } },
        customer: { connect: { id: customerId } },
        startDate,
        endDate,
        specialRequests,
        status: reservationStatus
      }
    })

    return newReservation
  } catch (error: Error | any) {
    const prismaError = handlePrismaError(error, "Reservation")
    throw new Error(prismaError.error)
  }
}

export default createReservation
