import express, { Router } from "express"
import userRouter from "./user/user.router"
import roomRouter from "./room/room.router"
import mealRouter from "./meal/meal.router"
import mealplanRouter from "./mealplan/mealplan.router"
import reservationRouter from "./reservation/reservation.router"
import reservationDailyMealRouter from "./ReservationDailyMeal/reservationDailyMeal.router"

const apiRouter: Router = express.Router()

apiRouter.use("/user", userRouter)
apiRouter.use("/room", roomRouter)
apiRouter.use("/meal", mealRouter)
apiRouter.use("/mealplan", mealplanRouter)
apiRouter.use("/reservation", reservationRouter)
apiRouter.use("/reservationDailyMeal", reservationDailyMealRouter)

export default apiRouter
