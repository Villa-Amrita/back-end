import { PrismaClient, Reservation, Status } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface UpdateReservationInput {
  id: number
  roomId: number
  customerId: string
  startDate: string
  endDate: string
  specialRequests: string
  status: string
}

async function updateReservation({
  id,
  roomId,
  customerId,
  startDate,
  endDate,
  specialRequests,
  status
}: UpdateReservationInput): Promise<Reservation> {
  try {
    const startDateFormatted = new Date(startDate)
    const endDateFormatted = new Date(endDate)
    const reservationStatus: Status = status as Status
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
        startDate: startDateFormatted,
        endDate: endDateFormatted,
        specialRequests,
        status: reservationStatus
      }
    })

    return updatedReservation
  } catch (error: Error | any) {
    const prismaError = handlePrismaError(error, "Reservation")
    throw new Error(prismaError.error)
  }
}

export default updateReservation
