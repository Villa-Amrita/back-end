import { t } from "../../../server/server"
import { z } from "zod"
import {
  createReservation,
  updateReservation,
  viewReservation,
  viewAllReservations
} from "./controllers"
import handleTRPCError from "../../../utils/handleTRPCError"

export const CreateReservationInput = z.object({
  roomId: z.number(),
  customerId: z.string(),
  startDate: z.date(),
  endDate: z.date()
})

export const Reservation = z.object({
  id: z.number(),
  roomId: z.number(),
  customerId: z.string(),
  startDate: z.date(),
  endDate: z.date()
})

export const reservationRouter = t.router({
  createReservation: t.procedure
    .input(CreateReservationInput)
    .output(Reservation)
    .mutation(async ({ input }) => {
      try {
        const reservation = await createReservation(input)
        return reservation
      } catch (error) {
        throw handleTRPCError(error, "Reservation")
      }
    }),
  updateReservation: t.procedure
    .input(Reservation)
    .output(Reservation)
    .mutation(async ({ input }) => {
      try {
        const reservation = await updateReservation(input)
        return reservation
      } catch (error) {
        throw handleTRPCError(error, "Reservation")
      }
    }),
  viewReservation: t.procedure
    .input(z.number())
    .output(Reservation)
    .query(async ({ input }) => {
      try {
        const reservation = await viewReservation({ id: input })
        return reservation
      } catch (error) {
        throw handleTRPCError(error, "Reservation")
      }
    }),
  viewAllReservations: t.procedure
    .output(z.array(Reservation))
    .query(async () => {
      try {
        const reservations = await viewAllReservations()
        return reservations
      } catch (error) {
        throw handleTRPCError(error, "Reservation")
      }
    })
})
