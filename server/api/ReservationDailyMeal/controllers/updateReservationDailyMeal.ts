import { PrismaClient, ReservationDailyMeal, MealType } from "@prisma/client"

const prisma = new PrismaClient()

interface UpdateReservationDailyMealInput {
  id: number
  mealId: number
  type: MealType
  quantity: number
}

async function updateReservationDailyMeal({
  id,
  mealId,
  type,
  quantity
}: UpdateReservationDailyMealInput): Promise<ReservationDailyMeal> {
  try {
    const updatedReservationDailyMeal =
      await prisma.reservationDailyMeal.update({
        where: {
          id: id
        },
        data: {
          mealId: mealId,
          type: type,
          quantity: quantity
        }
      })

    return updatedReservationDailyMeal
  } catch (error: any) {
    throw new Error(
      error.message || "An error occurred while updating ReservationDailyMeal"
    )
  }
}

export default updateReservationDailyMeal
