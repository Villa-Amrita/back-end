import { PrismaClient, ReservationDailyMeal } from "@prisma/client"

const prisma = new PrismaClient()

interface ViewReservationDailyMealInput {
  id: number
}

async function viewReservationDailyMeal({
  id
}: ViewReservationDailyMealInput): Promise<ReservationDailyMeal | null> {
  try {
    const reservationDailyMeal = await prisma.reservationDailyMeal.findUnique({
      where: {
        id
      }
    })

    return reservationDailyMeal
  } catch (error: any) {
    throw new Error(
      error.message || "An error occurred while viewing ReservationDailyMeal"
    )
  }
}

export default viewReservationDailyMeal
