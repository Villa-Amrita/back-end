import { t } from "../../../server/server"
import { z } from "zod"
import {
  createReservationDailyMealSet,
  updateReservationDailyMealSet,
  viewReservationDailyMealSet,
  viewAllReservationDailyMealSets
} from "./controllers"
import handleTRPCError from "../../../utils/handleTRPCError"

export const CreateReservationDailyMealSetInput = z.object({
  reservationId: z.number(),
  date: z.date()
})

export const ReservationDailyMealSet = z.object({
  id: z.number(),
  reservationId: z.number(),
  date: z.date()
})

export const reservationDailyMealSetRouter = t.router({
  createReservationDailyMealSet: t.procedure
    .input(CreateReservationDailyMealSetInput)
    .output(ReservationDailyMealSet)
    .mutation(async ({ input }) => {
      try {
        const newReservationDailyMealSet = await createReservationDailyMealSet(
          input
        )
        return newReservationDailyMealSet
      } catch (error) {
        throw handleTRPCError(error, "ReservationDailyMealSet")
      }
    }),
  updateReservationDailyMealSet: t.procedure
    .input(ReservationDailyMealSet)
    .output(ReservationDailyMealSet)
    .mutation(async ({ input }) => {
      try {
        const updatedReservationDailyMealSet =
          await updateReservationDailyMealSet(input)
        return updatedReservationDailyMealSet
      } catch (error) {
        throw handleTRPCError(error, "ReservationDailyMealSet")
      }
    }),
  viewReservationDailyMealSet: t.procedure
    .input(z.number())
    .output(ReservationDailyMealSet)
    .query(async ({ input }) => {
      try {
        const reservationDailyMealSet = await viewReservationDailyMealSet({
          id: input
        })
        return reservationDailyMealSet
      } catch (error) {
        throw handleTRPCError(error, "ReservationDailyMealSet")
      }
    }),
  viewAllReservationDailyMealSets: t.procedure
    .output(z.array(ReservationDailyMealSet))
    .query(async () => {
      try {
        const allReservationDailyMealSets =
          await viewAllReservationDailyMealSets()
        return allReservationDailyMealSets
      } catch (error) {
        throw handleTRPCError(error, "ReservationDailyMealSet")
      }
    })
})
