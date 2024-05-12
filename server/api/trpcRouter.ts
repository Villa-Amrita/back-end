import { t } from "../server"
import { userRouter } from "./user/user.trpc.router"
import { roomRouter } from "./room/room.trpc.router"
import { mealRouter } from "./meal/meal.trpc.router"
import { mealPlanRouter } from "./mealplan/mealplan.trpc.router"
import { reservationRouter } from "./reservation/reservation.trpc.router"
import { reservationDailyMealRouter } from "./ReservationDailyMeal/reservationDailyMeal.trpc.router"
import { reservationDailyMealSetRouter } from "./reservationDailyMealSet/reservationDailyMealSet.trpc.router"

export const trpcRouter = t.router({
  user: userRouter,
  room: roomRouter,
  meal: mealRouter,
  mealplan: mealPlanRouter,
  reservation: reservationRouter,
  reservationDailyMeal: reservationDailyMealRouter,
  reservationDailyMealSet: reservationDailyMealSetRouter
})
