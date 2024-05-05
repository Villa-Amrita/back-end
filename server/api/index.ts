import express, { Router } from "express"
import userRouter from "./user/user.router"

const apiRouter: Router = express.Router()

apiRouter.use("/user", userRouter)

export default apiRouter
