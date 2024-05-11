import { PrismaClient, ReservationDailyMeal } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface ViewReservationDailyMealInput {
  id: number
}

async function viewReservationDailyMeal({
  id
}: ViewReservationDailyMealInput): Promise<ReservationDailyMeal> {
  try {
    const reservationDailyMeal = await prisma.reservationDailyMeal.findUnique({
      where: {
        id
      }
    })

    if (!reservationDailyMeal) {
      throw new Error("ReservationDailyMeal not found")
    }

    return reservationDailyMeal
  } catch (error: any) {
    const prismaError = handlePrismaError(error, "ReservationDailyMeal")
    throw new Error(prismaError.error)
  }
}

export default viewReservationDailyMeal
