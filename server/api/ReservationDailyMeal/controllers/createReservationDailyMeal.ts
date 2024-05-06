import { PrismaClient, ReservationDailyMeal, MealType } from "@prisma/client"

const prisma = new PrismaClient()

interface CreateReservationDailyMealInput {
  reservationDailyMealSetId: number
  mealId: number
  type: MealType
  quantity: number
}

async function createReservationDailyMeal({
  reservationDailyMealSetId,
  mealId,
  type,
  quantity
}: CreateReservationDailyMealInput): Promise<ReservationDailyMeal> {
  try {
    const newReservationDailyMeal = await prisma.reservationDailyMeal.create({
      data: {
        reservationDailyMealSetId,
        mealId,
        type,
        quantity
      }
    })

    return newReservationDailyMeal
  } catch (error: any) {
    throw new Error(
      error.message || "An error occurred while creating ReservationDailyMeal"
    )
  }
}

export default createReservationDailyMeal
