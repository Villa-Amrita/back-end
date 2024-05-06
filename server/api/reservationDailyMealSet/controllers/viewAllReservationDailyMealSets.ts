import { PrismaClient, ReservationDailyMealSet } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

async function viewAllReservationDailyMealSets(): Promise<
  ReservationDailyMealSet[]
> {
  try {
    const reservationDailyMealSets =
      await prisma.reservationDailyMealSet.findMany()

    return reservationDailyMealSets
  } catch (error: any) {
    const prismaError = handlePrismaError(error, "ReservationDailyMealSet")
    throw new Error(prismaError.error)
  }
}

export default viewAllReservationDailyMealSets
