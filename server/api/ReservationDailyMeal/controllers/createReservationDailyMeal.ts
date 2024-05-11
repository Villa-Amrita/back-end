import { PrismaClient, ReservationDailyMeal, MealType } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface CreateReservationDailyMealInput {
  reservationDailyMealSetId: number
  mealId: number
  type: string
  quantity: number
}

async function createReservationDailyMeal({
  reservationDailyMealSetId,
  mealId,
  type,
  quantity
}: CreateReservationDailyMealInput): Promise<ReservationDailyMeal> {
  try {
    const mealType: MealType = type as MealType
    const newReservationDailyMeal = await prisma.reservationDailyMeal.create({
      data: {
        reservationDailyMealSetId,
        mealId,
        type: mealType,
        quantity
      }
    })

    return newReservationDailyMeal
  } catch (error: any) {
    const prismaError = handlePrismaError(error, "ReservationDailyMeal")
    throw new Error(prismaError.error)
  }
}

export default createReservationDailyMeal
