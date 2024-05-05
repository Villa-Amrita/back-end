import { PrismaClient, MealPlan } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

async function viewAllMealPlans(): Promise<MealPlan[]> {
  try {
    const allMealPlans = await prisma.mealPlan.findMany({
      include: {
        meals: true
      }
    })
    return allMealPlans
  } catch (error: any) {
    const prismaError = handlePrismaError(error, "MealPlan")
    throw new Error(prismaError.error)
  }
}

export default viewAllMealPlans
