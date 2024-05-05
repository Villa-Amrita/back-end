import { PrismaClient, MealPlan } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface UpdateMealPlanInput {
  id: number
  name: string
  description: string
}

async function updateMealPlan({
  id,
  name,
  description
}: UpdateMealPlanInput): Promise<MealPlan> {
  try {
    const updatedMealPlan = await prisma.mealPlan.update({
      where: {
        id
      },
      data: {
        name,
        description
      }
    })
    return updatedMealPlan
  } catch (error: any) {
    const prismaError = handlePrismaError(error, "MealPlan")
    throw new Error(prismaError.error)
  }
}

export default updateMealPlan
