import express, { Request, Response, Router } from "express"
import { Meal } from "@prisma/client"
import { createMeal, updateMeal, viewMeal, viewAllMeals } from "./controllers"

interface CreateMealInput {
  name: string
  description: string
  breakfastAvailable: boolean
  lunchAvailable: boolean
  dinnerAvailable: boolean
  mealPlanId: number
}

interface UpdateMealInput {
  id: number
  name: string
  description: string
  breakfastAvailable: boolean
  lunchAvailable: boolean
  dinnerAvailable: boolean
  mealPlanId: number
}

const mealRouter: Router = express.Router()

mealRouter.route("/create").post(async (req: Request, res: Response) => {
  try {
    const mealInput: CreateMealInput = req.body
    const meal: Meal = await createMeal(mealInput)
    res.status(200).json({ message: "Meal Created", data: meal })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

mealRouter.route("/update").put(async (req: Request, res: Response) => {
  try {
    const mealInput: UpdateMealInput = req.body
    const meal: Meal = await updateMeal(mealInput)
    res.status(200).json({ message: "Meal Updated", data: meal })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

mealRouter.route("/view/:id").get(async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id)
    const meal: Meal = await viewMeal({ id })
    res.status(200).json({ message: "Meal Viewed", data: meal })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

mealRouter.route("/viewAll").get(async (req: Request, res: Response) => {
  try {
    const meals: Meal[] = await viewAllMeals()
    res.status(200).json({ message: "Meals Viewed", data: meals })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

export default mealRouter
