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

userRouter.route("/view/:id").get(async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const user: User = await viewUser({ id })
    res.status(200).json({ message: "User Viewed", data: user })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

userRouter
  .route("/viewByEmail/:email")
  .get(async (req: Request, res: Response) => {
    try {
      const email: string = req.params.email
      const user: User = await viewUserByEmail({ email })
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
