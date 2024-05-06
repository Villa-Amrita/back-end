import express, { Request, Response, Router } from "express"
import {
  createReservationDailyMeal,
  updateReservationDailyMeal,
  viewReservationDailyMeal,
  viewAllReservationDailyMeals,
  MealType
} from "./controllers"

interface CreateReservationDailyMealInput {
  reservationDailyMealSetId: number
  mealId: number
  type: MealType
  quantity: number
}

interface UpdateReservationDailyMealInput {
  id: number
  mealId: number
  type: MealType
  quantity: number
}

const reservationDailyMealRouter: Router = express.Router()

reservationDailyMealRouter
  .route("/create")
  .post(async (req: Request, res: Response) => {
    try {
      const {
        reservationDailyMealSetId,
        mealId,
        type,
        quantity
      }: CreateReservationDailyMealInput = req.body
      const reservationDailyMeal = await createReservationDailyMeal({
        reservationDailyMealSetId,
        mealId,
        type,
        quantity
      })
      res
        .status(200)
        .json({
          message: "ReservationDailyMeal Created",
          data: reservationDailyMeal
        })
    } catch (error: any) {
      console.log(error)
      res.status(500).json({ error: error.message })
    }
  })

reservationDailyMealRouter
  .route("/update")
  .put(async (req: Request, res: Response) => {
    try {
      const { id, mealId, type, quantity }: UpdateReservationDailyMealInput =
        req.body
      const updatedReservationDailyMeal = await updateReservationDailyMeal({
        id,
        mealId,
        type,
        quantity
      })
      res
        .status(200)
        .json({
          message: "ReservationDailyMeal Updated",
          data: updatedReservationDailyMeal
        })
    } catch (error: any) {
      console.log(error)
      res.status(500).json({ error: error.message })
    }
  })

reservationDailyMealRouter
  .route("/view/:id")
  .get(async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id)
      const reservationDailyMeal = await viewReservationDailyMeal({ id })
      res
        .status(200)
        .json({
          message: "ReservationDailyMeal Viewed",
          data: reservationDailyMeal
        })
    } catch (error: any) {
      console.log(error)
      res.status(500).json({ error: error.message })
    }
  })

reservationDailyMealRouter
  .route("/viewAll")
  .get(async (req: Request, res: Response) => {
    try {
      const allReservationDailyMeals = await viewAllReservationDailyMeals()
      res
        .status(200)
        .json({
          message: "All ReservationDailyMeals Viewed",
          data: allReservationDailyMeals
        })
    } catch (error: any) {
      console.log(error)
      res.status(500).json({ error: error.message })
    }
  })

export default reservationDailyMealRouter
