// import { t } from "../../../server/server"
// import { z } from "zod"
// import {
//   createReservationDailyMeal,
//   updateReservationDailyMeal,
//   viewReservationDailyMeal,
//   viewAllReservationDailyMeals
// } from "./controllers"
// import handleTRPCError from "../../../utils/handleTRPCError"

// export const CreateReservationDailyMealInput = z.object({
//   reservationDailyMealSetId: z.number(),
//   mealId: z.number(),
//   type: z.string(),
//   quantity: z.number()
// })

// export const ReservationDailyMeal = z.object({
//   id: z.number(),
//   mealId: z.number(),
//   type: z.string(),
//   quantity: z.number()
// })

// export const reservationDailyMealRouter = t.router({
//   createReservationDailyMeal: t.procedure
//     .input(CreateReservationDailyMealInput)
//     .output(ReservationDailyMeal)
//     .mutation(async ({ input }) => {
//       try {
//         const reservationDailyMeal = await createReservationDailyMeal(input)
//         return reservationDailyMeal
//       } catch (error) {
//         throw handleTRPCError(error, "ReservationDailyMeal")
//       }
//     }),
//   updateReservationDailyMeal: t.procedure
//     .input(ReservationDailyMeal)
//     .output(ReservationDailyMeal)
//     .mutation(async ({ input }) => {
//       try {
//         const updatedReservationDailyMeal = await updateReservationDailyMeal(
//           input
//         )
//         return updatedReservationDailyMeal
//       } catch (error) {
//         throw handleTRPCError(error, "ReservationDailyMeal")
//       }
//     }),
//   viewReservationDailyMeal: t.procedure
//     .input(z.number())
//     .output(ReservationDailyMeal)
//     .query(async ({ input }) => {
//       try {
//         const reservationDailyMeal = await viewReservationDailyMeal({
//           id: input
//         })
//         return reservationDailyMeal
//       } catch (error) {
//         throw handleTRPCError(error, "ReservationDailyMeal")
//       }
//     }),
//   viewAllReservationDailyMeals: t.procedure
//     .output(z.array(ReservationDailyMeal))
//     .query(async () => {
//       try {
//         const allReservationDailyMeals = await viewAllReservationDailyMeals()
//         return allReservationDailyMeals
//       } catch (error) {
//         throw handleTRPCError(error, "ReservationDailyMeal")
//       }
//     })
// })
