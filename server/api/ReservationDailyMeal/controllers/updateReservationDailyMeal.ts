import { PrismaClient, ReservationDailyMeal, MealType } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface UpdateReservationDailyMealInput {
  id: number
  mealId: number
  type: string
  quantity: number
}

async function updateReservationDailyMeal({
  id,
  mealId,
  type,
  quantity
}: UpdateReservationDailyMealInput): Promise<ReservationDailyMeal> {
  try {
    const mealType: MealType = type as MealType
    const updatedReservationDailyMeal =
      await prisma.reservationDailyMeal.update({
        where: {
          id: id
        },
        data: {
          mealId: mealId,
          type: mealType,
          quantity: quantity
        }
      })

    return updatedReservationDailyMeal
  } catch (error: any) {
    const prismaError = handlePrismaError(error, "ReservationDailyMeal")
    throw new Error(prismaError.error)
  }
}

export default updateReservationDailyMeal
