import { PrismaClient, Meal } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface ViewMealInput {
  id: number
}

async function viewMeal({ id }: ViewMealInput): Promise<Meal> {
  try {
    const meal = await prisma.meal.findUnique({
      where: {
        id
      },
      include: {
        mealPlan: true
      }
    })
    if (!meal) {
      throw new Error("Meal not found")
    }
    return meal
  } catch (error: any) {
    const prismaError = handlePrismaError(error, "Meal")
    throw new Error(prismaError.error)
  }
}

export default viewMeal
