import { PrismaClient, ReservationDailyMealSet } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface CreateReservationDailyMealSetInput {
  reservationId: number
  date: Date
}

async function createReservationDailyMealSet({
  reservationId,
  date
}: CreateReservationDailyMealSetInput): Promise<ReservationDailyMealSet> {
  try {
    const newReservationDailyMealSet =
      await prisma.reservationDailyMealSet.create({
        data: {
          reservationId: reservationId,
          date: date
        }
      })
    return newReservationDailyMealSet
  } catch (error: any) {
    const prismaError = handlePrismaError(error, "ReservationDailyMealSet")
    throw new Error(prismaError.error)
  }
}

export default createReservationDailyMealSet
