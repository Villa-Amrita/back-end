// import { t } from "../../../server/server"
// import { z } from "zod"
// import { createMeal, updateMeal, viewMeal, viewAllMeals } from "./controllers"
// import handleTRPCError from "../../../utils/handleTRPCError"

// export const CreateMealInput = z.object({
//   name: z.string(),
//   description: z.string(),
//   breakfastAvailable: z.boolean(),
//   lunchAvailable: z.boolean(),
//   dinnerAvailable: z.boolean(),
//   mealPlanId: z.number()
// })

// export const Meal = z.object({
//   id: z.number(),
//   name: z.string(),
//   description: z.string(),
//   breakfastAvailable: z.boolean(),
//   lunchAvailable: z.boolean(),
//   dinnerAvailable: z.boolean(),
//   mealPlanId: z.number()
// })

// export const mealRouter = t.router({
//   createMeal: t.procedure
//     .input(CreateMealInput)
//     .output(Meal)
//     .mutation(async ({ input }) => {
//       try {
//         const meal = await createMeal(input)
//         return meal
//       } catch (error) {
//         throw handleTRPCError(error, "Meal")
//       }
//     }),
//   updateMeal: t.procedure
//     .input(Meal)
//     .output(Meal)
//     .mutation(async ({ input }) => {
//       try {
//         const meal = await updateMeal(input)
//         return meal
//       } catch (error) {
//         throw handleTRPCError(error, "Meal")
//       }
//     }),
//   viewMeal: t.procedure
//     .input(z.number())
//     .output(Meal)
//     .query(async ({ input }) => {
//       try {
//         const meal = await viewMeal({ id: input })
//         return meal
//       } catch (error) {
//         throw handleTRPCError(error, "Meal")
//       }
//     }),
//   viewAllMeals: t.procedure.output(z.array(Meal)).query(async () => {
//     try {
//       const meals = await viewAllMeals()
//       return meals
//     } catch (error) {
//       throw handleTRPCError(error, "Meal")
//     }
//   })
// })
