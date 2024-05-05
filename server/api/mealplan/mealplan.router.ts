import express, { Request, Response, Router } from "express"
import { MealPlan } from "@prisma/client"
import {
  createMealPlan,
  updateMealPlan,
  viewMealPlan,
  viewAllMealPlans
} from "./controllers"

interface CreateMealPlanInput {
  name: string
  description: string
}

interface UpdateMealPlanInput {
  id: number
  name: string
  description: string
}

const mealPlanRouter: Router = express.Router()

mealPlanRouter.route("/create").post(async (req: Request, res: Response) => {
  try {
    const mealPlanInput: CreateMealPlanInput = req.body
    const mealPlan: MealPlan = await createMealPlan(mealPlanInput)
    res.status(200).json({ message: "Meal Plan Created", data: mealPlan })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

mealPlanRouter.route("/update").put(async (req: Request, res: Response) => {
  try {
    const mealPlanInput: UpdateMealPlanInput = req.body
    const mealPlan: MealPlan = await updateMealPlan(mealPlanInput)
    res.status(200).json({ message: "Meal Plan Updated", data: mealPlan })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

mealPlanRouter.route("/view/:id").get(async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id)
    const mealPlan: MealPlan = await viewMealPlan({ id: id })
    res.status(200).json({ message: "Meal Plan Viewed", data: mealPlan })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

mealPlanRouter.route("/viewAll").get(async (req: Request, res: Response) => {
  try {
    const mealPlans: MealPlan[] = await viewAllMealPlans()
    res.status(200).json({ message: "Meal Plans Viewed", data: mealPlans })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

export default mealPlanRouter
