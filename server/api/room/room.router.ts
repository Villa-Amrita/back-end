import express, { Request, Response, Router } from "express"
import { Room } from "@prisma/client"
import { updateRoom, viewRoom, viewAllRooms } from "./controllers"

interface UpdateRoomInput {
  id: number
  roomName: string
  roomSize: number
  roomDescription: string
  roomConditions: string
  roomPrice: number
}

const roomRouter: Router = express.Router()

roomRouter.route("/update").put(async (req: Request, res: Response) => {
  try {
    const roomInput: UpdateRoomInput = req.body
    const room: Room = await updateRoom(roomInput)
    res.status(200).json({ message: "Room Updated", data: room })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

roomRouter.route("/view/:id").get(async (req: Request, res: Response) => {
  try {
    const roomId: number = parseInt(req.params.id)
    const room: Room = await viewRoom({ id: roomId })
    res.status(200).json({ message: "Room Viewed", data: room })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

roomRouter.route("/viewAll").get(async (req: Request, res: Response) => {
  try {
    const rooms: Room[] = await viewAllRooms()
    res.status(200).json({ message: "Rooms Viewed", data: rooms })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

export default roomRouter
