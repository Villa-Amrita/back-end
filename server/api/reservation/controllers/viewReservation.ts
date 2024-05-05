import { PrismaClient, Reservation } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface ViewReservationInput {
  id: number
}

async function viewReservation({
  id
}: ViewReservationInput): Promise<Reservation> {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: {
        id
      }
    })

    if (!reservation) {
      throw new Error("Reservation not found")
    }

    return reservation
  } catch (error: Error | any) {
    const prismaError = handlePrismaError(error, "Reservation")
    throw new Error(prismaError.error)
  }
}

export default viewReservation
