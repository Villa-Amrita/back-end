import { PrismaClient, Meal } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface CreateMealInput {
  name: string
  description: string
  breakfastAvailable: boolean
  lunchAvailable: boolean
  dinnerAvailable: boolean
  mealPlanId: number
}

async function createMeal({
  name,
  description,
  breakfastAvailable,
  lunchAvailable,
  dinnerAvailable,
  mealPlanId
}: CreateMealInput): Promise<Meal> {
  try {
    const newMeal = await prisma.meal.create({
      data: {
        name,
        description,
        breakfastAvailable,
        lunchAvailable,
        dinnerAvailable,
        mealPlan: {
          connect: {
            id: mealPlanId
          }
        }
      }
    })
    return newMeal
  } catch (error: any) {
    const prismaError = handlePrismaError(error, "Meal")
    throw new Error(prismaError.error)
  }
}

export default createMeal
