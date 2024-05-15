import { test, expect } from "vitest"
import makeRequest from "./makeRequests"

const dummyMealData = {
  name: "Test Meal",
  description: "A delicious test meal for testing purposes",
  breakfastAvailable: true,
  lunchAvailable: false,
  dinnerAvailable: true,
  mealPlanId: 1
}

test("createMeal creates a new meal", async () => {
  // Make a POST request to the create endpoint with dummy data
  const response = await makeRequest(
    "http://localhost:your-port/api/meals/create",
    "POST",
    dummyMealData
  )
  expect(response.status).toBe(200)

  // Parse the response data
  const data = await response.json()
  expect(data).toHaveProperty("message")
  expect(data.message).toBe("Meal Created")

  // Assert properties of the created meal (assuming it's returned in the response)
  expect(data).toHaveProperty("data")
  expect(data.data.name).toBe(dummyMealData.name)
  expect(data.data.description).toBe(dummyMealData.description)
  expect(data.data.breakfastAvailable).toBe(dummyMealData.breakfastAvailable)
  expect(data.data.lunchAvailable).toBe(dummyMealData.lunchAvailable)
  expect(data.data.dinnerAvailable).toBe(dummyMealData.dinnerAvailable)
  expect(data.data.mealPlanId).toBe(dummyMealData.mealPlanId)
})
