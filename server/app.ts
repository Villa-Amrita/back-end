import express, { Request, Response } from "express"
import apiRouter from "./api"

const app = express()

// Add express.json middleware
app.use(express.json())

// Attach routes in to app
app.use("/api", apiRouter)

const port = process.env.PORT || 8080
app.get("/", (req: Request, res: Response) => {
  return res.json({ message: `Server is running in port ${port}` })
})

export default app
