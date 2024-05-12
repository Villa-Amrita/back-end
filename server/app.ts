import express, { Request, Response } from "express"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import apiRouter from "./api"
import { trpcRouter } from "./api/trpcRouter"

const app = express()

// Add express.json middleware
app.use(express.json())

// Attach routes in to app
app.use("/api", apiRouter)
app.use("/trpc", createExpressMiddleware({ router: trpcRouter }))

const port = process.env.PORT || 8080
app.get("/", (req: Request, res: Response) => {
  return res.json({ message: `Server is running in port ${port}` })
})

export default app
