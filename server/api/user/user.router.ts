import express, { Request, Response, Router } from "express"
import { User } from "@prisma/client"
import {
  createUser,
  updateUser,
  viewUser,
  viewUserByEmail,
  viewAllUsers
} from "./controllers"

interface UserInput {
  id: string
  firstName: string
  familyName: string
  nic: string
  email: string
}

const userRouter: Router = express.Router()

userRouter.route("/create").post(async (req: Request, res: Response) => {
  try {
    const userInput: UserInput = req.body
    const user: User = await createUser(userInput)
    res.status(200).json({ message: "User Created", data: user })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

userRouter.route("/update").put(async (req: Request, res: Response) => {
  try {
    const userInput: UserInput = req.body
    const user: User = await updateUser(userInput)
    res.status(200).json({ message: "User Updated", data: user })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

userRouter.route("/view").get(async (req: Request, res: Response) => {
  try {
    const user: User = await viewUser(req.body)
    res.status(200).json({ message: "User Viewed", data: user })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

userRouter.route("/viewByEmail").get(async (req: Request, res: Response) => {
  try {
    const user: User = await viewUserByEmail(req.body)
    res.status(200).json({ message: "User Viewed", data: user })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

userRouter.route("/viewAll").get(async (req: Request, res: Response) => {
  try {
    const users: User[] = await viewAllUsers()
    res.status(200).json({ message: "Users Viewed", data: users })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

export default userRouter
