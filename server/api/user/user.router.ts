import express, { Request, Response, Router } from "express"
import { User } from "@prisma/client"
import { createUser } from "./controllers"

interface UserInput {
  id: string
  firstName: string
  familyName: string
  nic: string
  email: string
}

const userRouter: Router = express.Router()

userRouter.route("/createUser").post(async (req: Request, res: Response) => {
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

export default userRouter
