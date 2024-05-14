import { PrismaClient, Reservation, Status } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface CreateReservationInput {
  roomId: number
  customerId: string
  startDate: string
  endDate: string
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
    const startDateFormatted = new Date(startDate)
    const endDateFormatted = new Date(endDate)
    const reservationStatus: Status = status as Status
    const newReservation = await prisma.reservation.create({
      data: {
        room: { connect: { id: roomId } },
        customer: { connect: { id: customerId } },
        startDate: startDateFormatted,
        endDate: endDateFormatted,
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
