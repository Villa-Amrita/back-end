import { t } from "../../../server/server"
import { z } from "zod"
import {
  createMealPlan,
  updateMealPlan,
  viewMealPlan,
  viewAllMealPlans
} from "./controllers"
import handleTRPCError from "../../../utils/handleTRPCError"

export const CreateMealPlanInput = z.object({
  name: z.string(),
  description: z.string()
})

export const MealPlan = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string()
})

export const mealPlanRouter = t.router({
  createMealPlan: t.procedure
    .input(CreateMealPlanInput)
    .output(MealPlan)
    .mutation(async ({ input }) => {
      try {
        const mealPlan = await createMealPlan(input)
        return mealPlan
      } catch (error) {
        throw handleTRPCError(error, "MealPlan")
      }
    }),
  updateMealPlan: t.procedure
    .input(MealPlan)
    .output(MealPlan)
    .mutation(async ({ input }) => {
      try {
        const mealPlan = await updateMealPlan(input)
        return mealPlan
      } catch (error) {
        throw handleTRPCError(error, "MealPlan")
      }
    }),
  viewMealPlan: t.procedure
    .input(z.number())
    .output(MealPlan)
    .query(async ({ input }) => {
      try {
        const mealPlan = await viewMealPlan({ id: input })
        return mealPlan
      } catch (error) {
        throw handleTRPCError(error, "MealPlan")
      }
    }),
  viewAllMealPlans: t.procedure.output(z.array(MealPlan)).query(async () => {
    try {
      const mealPlans = await viewAllMealPlans()
      return mealPlans
    } catch (error) {
      throw handleTRPCError(error, "MealPlan")
    }
  })
})
