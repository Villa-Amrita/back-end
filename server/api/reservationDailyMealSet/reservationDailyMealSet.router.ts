import express, { Request, Response, Router } from "express"
import {
  createReservationDailyMealSet,
  updateReservationDailyMealSet,
  viewReservationDailyMealSet,
  viewAllReservationDailyMealSets
} from "./controllers"

interface CreateReservationDailyMealSetInput {
  reservationId: number
  date: Date
}

interface UpdateReservationDailyMealSetInput {
  id: number
  reservationId: number
  date: Date
}

const reservationDailyMealSetRouter: Router = express.Router()

reservationDailyMealSetRouter
  .route("/create")
  .post(async (req: Request, res: Response) => {
    try {
      const reservationDailyMealSetInput: CreateReservationDailyMealSetInput =
        req.body
      const newReservationDailyMealSet = await createReservationDailyMealSet(
        reservationDailyMealSetInput
      )
      res.status(200).json({
        message: "ReservationDailyMealSet Created",
        data: newReservationDailyMealSet
      })
    } catch (error: any) {
      console.log(error)
      res.status(500).json({
        error: error.message
      })
    }
  })

reservationDailyMealSetRouter
  .route("/update")
  .put(async (req: Request, res: Response) => {
    try {
      const reservationDailyMealSetInput: UpdateReservationDailyMealSetInput =
        req.body
      const updatedReservationDailyMealSet =
        await updateReservationDailyMealSet(reservationDailyMealSetInput)
      res.status(200).json({
        message: "ReservationDailyMealSet Updated",
        data: updatedReservationDailyMealSet
      })
    } catch (error: any) {
      console.log(error)
      res.status(500).json({
        error: error.message
      })
    }
  })

reservationDailyMealSetRouter
  .route("/view/:id")
  .get(async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id)
      const reservationDailyMealSet = await viewReservationDailyMealSet({ id })
      res.status(200).json({
        message: "ReservationDailyMealSet Viewed",
        data: reservationDailyMealSet
      })
    } catch (error: any) {
      console.log(error)
      res.status(500).json({
        error: error.message
      })
    }
  })

reservationDailyMealSetRouter
  .route("/viewAll")
  .get(async (req: Request, res: Response) => {
    try {
      const allReservationDailyMealSets =
        await viewAllReservationDailyMealSets()
      res.status(200).json({
        message: "All ReservationDailyMealSets Viewed",
        data: allReservationDailyMealSets
      })
    } catch (error: any) {
      console.log(error)
      res.status(500).json({
        error: error.message
      })
    }
  })

export default reservationDailyMealSetRouter
