import express, { Request, Response, Router } from "express"
import {
  createReservation,
  updateReservation,
  viewReservation,
  viewAllReservations
} from "./controllers"

interface CreateReservationInput {
  roomId: number
  customerId: string
  startDate: Date
  endDate: Date
}

interface UpdateReservationInput {
  id: number
  roomId: number
  customerId: string
  startDate: Date
  endDate: Date
}

const reservationRouter: Router = express.Router()

reservationRouter.route("/create").post(async (req: Request, res: Response) => {
  try {
    const { roomId, customerId, startDate, endDate }: CreateReservationInput =
      req.body
    const reservation = await createReservation({
      roomId,
      customerId,
      startDate,
      endDate
    })
    res.status(200).json({ message: "Reservation Created", data: reservation })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

reservationRouter.route("/update").put(async (req: Request, res: Response) => {
  try {
    const {
      id,
      roomId,
      customerId,
      startDate,
      endDate
    }: UpdateReservationInput = req.body
    const reservation = await updateReservation({
      id,
      roomId,
      customerId,
      startDate,
      endDate
    })
    res.status(200).json({ message: "Reservation Updated", data: reservation })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

reservationRouter
  .route("/view/:id")
  .get(async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id)
      const reservation = await viewReservation({ id })
      res.status(200).json({ message: "Reservation Viewed", data: reservation })
    } catch (error: any) {
      console.log(error)
      res.status(500).json({
        error: error.message
      })
    }
  })

reservationRouter.route("/viewAll").get(async (req: Request, res: Response) => {
  try {
    const reservations = await viewAllReservations()
    res.status(200).json({ message: "Reservations Viewed", data: reservations })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

export default reservationRouter
