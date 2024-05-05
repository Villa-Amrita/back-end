import { PrismaClient, MealPlan } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface CreateMealPlanInput {
  name: string
  description: string
}

async function createMealPlan({
  name,
  description
}: CreateMealPlanInput): Promise<MealPlan> {
  try {
    const newMealPlan = await prisma.mealPlan.create({
      data: {
        name,
        description
      }
    })
    return newMealPlan
  } catch (error: any) {
    const prismaError = handlePrismaError(error, "Meal Plan")
    throw new Error(prismaError.error)
  }
}

export default createMealPlan
