import { PrismaClient, ReservationDailyMealSet } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface UpdateReservationDailyMealSetInput {
  id: number
  reservationId?: number
  date?: Date
}

async function updateReservationDailyMealSet({
  id,
  reservationId,
  date
}: UpdateReservationDailyMealSetInput): Promise<ReservationDailyMealSet> {
  try {
    const updatedReservationDailyMealSet =
      await prisma.reservationDailyMealSet.update({
        where: {
          id: id
        },
        data: {
          reservationId: reservationId,
          date: date
        }
      })

    return updatedReservationDailyMealSet
  } catch (error: any) {
    const prismaError = handlePrismaError(error, "ReservationDailyMealSet")
    throw new Error(prismaError.error)
  }
}

export default updateReservationDailyMealSet
