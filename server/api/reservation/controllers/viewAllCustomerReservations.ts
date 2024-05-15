import { PrismaClient, Reservation } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface ViewReservationInput {
  customerId: string
}

async function viewAllCustomerReservations({
  customerId
}: ViewReservationInput): Promise<Reservation[]> {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        customerId: customerId
      }
    })

    if (!reservations) {
      throw new Error("Reservation not found")
    }

    return reservations
  } catch (error: Error | any) {
    const prismaError = handlePrismaError(error, "Reservation")
    throw new Error(prismaError.error)
  }
}

export default viewAllCustomerReservations
