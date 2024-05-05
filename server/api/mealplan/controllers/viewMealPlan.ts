import { PrismaClient, MealPlan } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface ViewMealPlanInput {
  id: number
}

async function viewMealPlan({ id }: ViewMealPlanInput): Promise<MealPlan> {
  try {
    const mealPlan = await prisma.mealPlan.findUnique({
      where: {
        id
      },
      include: {
        meals: true
      }
    })
    if (!mealPlan) {
      throw new Error("Meal Plan not found")
    }
    return mealPlan
  } catch (error: any) {
    const prismaError = handlePrismaError(error, "MealPlan")
    throw new Error(prismaError.error)
  }
}

export default viewMealPlan
