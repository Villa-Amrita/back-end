import { PrismaClient, ReservationDailyMeal } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

async function viewAllReservationDailyMeals(): Promise<ReservationDailyMeal[]> {
  try {
    const allReservationDailyMeals =
      await prisma.reservationDailyMeal.findMany()
    return allReservationDailyMeals
  } catch (error: any) {
    const prismaError = handlePrismaError(error, "ReservationDailyMeal")
    throw new Error(prismaError.error)
  }
}

export default viewAllReservationDailyMeals
