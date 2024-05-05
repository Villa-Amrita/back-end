import { PrismaClient, Meal } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

async function viewAllMeals(): Promise<Meal[]> {
  try {
    const allMeals = await prisma.meal.findMany({
      include: {
        mealPlan: true
      }
    })
    return allMeals
  } catch (error: any) {
    const prismaError = handlePrismaError(error, "Meal")
    throw new Error(prismaError.error)
  }
}

export default viewAllMeals
