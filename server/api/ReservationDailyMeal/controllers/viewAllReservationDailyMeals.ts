import { PrismaClient, ReservationDailyMeal } from "@prisma/client"

const prisma = new PrismaClient()

async function viewAllReservationDailyMeals(): Promise<ReservationDailyMeal[]> {
  try {
    const allReservationDailyMeals =
      await prisma.reservationDailyMeal.findMany()
    return allReservationDailyMeals
  } catch (error: any) {
    throw new Error(
      error.message ||
        "An error occurred while viewing all ReservationDailyMeals"
    )
  }
}

export default viewAllReservationDailyMeals
