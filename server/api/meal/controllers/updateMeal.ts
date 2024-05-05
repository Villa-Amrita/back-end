import { PrismaClient, Meal } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface UpdateMealInput {
  id: number
  name: string
  description: string
  breakfastAvailable: boolean
  lunchAvailable: boolean
  dinnerAvailable: boolean
  mealPlanId: number
}

async function updateMeal({
  id,
  name,
  description,
  breakfastAvailable,
  lunchAvailable,
  dinnerAvailable,
  mealPlanId
}: UpdateMealInput): Promise<Meal> {
  try {
    const updatedMeal = await prisma.meal.update({
      where: {
        id
      },
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
    return updatedMeal
  } catch (error: any) {
    const prismaError = handlePrismaError(error, "Meal")
    throw new Error(prismaError.error)
  }
}

export default updateMeal
