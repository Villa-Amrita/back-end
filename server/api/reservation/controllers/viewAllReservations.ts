import { PrismaClient, Reservation } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

async function viewAllReservations(): Promise<Reservation[]> {
  try {
    const reservations = await prisma.reservation.findMany()
    return reservations
  } catch (error: Error | any) {
    const prismaError = handlePrismaError(error, "Reservation")
    throw new Error(prismaError.error)
  }
}

export default viewAllReservations
