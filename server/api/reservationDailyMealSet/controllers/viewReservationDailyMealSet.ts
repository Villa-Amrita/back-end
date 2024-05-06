import { PrismaClient, ReservationDailyMealSet } from "@prisma/client"
import handlePrismaError from "../../../../utils/handlePrismaError"

const prisma = new PrismaClient()

interface ViewReservationDailyMealSetInput {
  id: number
}

async function viewReservationDailyMealSet({
  id
}: ViewReservationDailyMealSetInput): Promise<ReservationDailyMealSet> {
  try {
    const reservationDailyMealSet =
      await prisma.reservationDailyMealSet.findUnique({
        where: {
          id: id
        }
      })

    if (!reservationDailyMealSet) {
      throw new Error("ReservationDailyMealSet not found")
    }

    return reservationDailyMealSet
  } catch (error: any) {
    const prismaError = handlePrismaError(error, "ReservationDailyMealSet")
    throw new Error(prismaError.error)
  }
}

export default viewReservationDailyMealSet
