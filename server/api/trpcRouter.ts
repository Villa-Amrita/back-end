import { initTRPC } from "@trpc/server"
import { z } from "zod"
import handleTRPCError from "../../utils/handleTRPCError"
import {
  createUser,
  updateUser,
  viewUser,
  viewUserByEmail,
  viewAllUsers
} from "./user/controllers"
import { updateRoom, viewRoom, viewAllRooms } from "./room/controllers"
import {
  createMeal,
  updateMeal,
  viewMeal,
  viewAllMeals
} from "./meal/controllers"
import {
  createMealPlan,
  updateMealPlan,
  viewMealPlan,
  viewAllMealPlans
} from "./mealplan/controllers"
import {
  createReservation,
  updateReservation,
  viewReservation,
  viewAllReservations,
  viewAllCustomerReservations
} from "./reservation/controllers"
import {
  createReservationDailyMeal,
  updateReservationDailyMeal,
  viewReservationDailyMeal,
  viewAllReservationDailyMeals
} from "./ReservationDailyMeal/controllers"
import {
  createReservationDailyMealSet,
  updateReservationDailyMealSet,
  viewReservationDailyMealSet,
  viewAllReservationDailyMealSets
} from "./reservationDailyMealSet/controllers"

//Create TRPC instance
const t = initTRPC.create()

//Input and Output Schemas
const User = z.object({
  id: z.string(),
  firstName: z.string(),
  familyName: z.string(),
  nic: z.string(),
  email: z.string().email()
})

const Room = z.object({
  id: z.number(),
  roomName: z.string(),
  roomSize: z.number(),
  roomDescription: z.string(),
  roomConditions: z.string(),
  roomPrice: z.number()
})

const CreateMealInput = z.object({
  name: z.string(),
  description: z.string(),
  breakfastAvailable: z.boolean(),
  lunchAvailable: z.boolean(),
  dinnerAvailable: z.boolean(),
  mealPlanId: z.number()
})

const Meal = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  breakfastAvailable: z.boolean(),
  lunchAvailable: z.boolean(),
  dinnerAvailable: z.boolean(),
  mealPlanId: z.number()
})

const CreateMealPlanInput = z.object({
  name: z.string(),
  description: z.string()
})

const MealPlan = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string()
})

const CreateReservationInput = z.object({
  roomId: z.number(),
  customerId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  specialRequests: z.string(),
  status: z.string()
})

const UpdateReservationInput = z.object({
  id: z.number(),
  roomId: z.number(),
  customerId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  specialRequests: z.string(),
  status: z.string()
})

const Reservation = z.object({
  id: z.number(),
  roomId: z.number(),
  customerId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  specialRequests: z.string(),
  status: z.string()
})

const CreateReservationDailyMealInput = z.object({
  reservationDailyMealSetId: z.number(),
  mealId: z.number(),
  type: z.string(),
  quantity: z.number()
})

const ReservationDailyMeal = z.object({
  id: z.number(),
  mealId: z.number(),
  type: z.string(),
  quantity: z.number()
})

const CreateReservationDailyMealSetInput = z.object({
  reservationId: z.number(),
  date: z.string()
})

const UpdateReservationDailyMealSetInput = z.object({
  id: z.number(),
  reservationId: z.number(),
  date: z.string()
})

const ReservationDailyMealSet = z.object({
  id: z.number(),
  reservationId: z.number(),
  date: z.date()
})

//Types
export type UserType = z.infer<typeof User>
export type RoomType = z.infer<typeof Room>
export type CreateMealInputType = z.infer<typeof CreateMealInput>
export type MealType = z.infer<typeof Meal>
export type CreateMealPlanInputType = z.infer<typeof CreateMealPlanInput>
export type MealPlanType = z.infer<typeof MealPlan>
export type CreateReservationInputType = z.infer<typeof CreateReservationInput>
export type UpdateReservationInputType = z.infer<typeof UpdateReservationInput>
export type ReservationType = z.infer<typeof Reservation>
export type CreateReservationDailyMealInputType = z.infer<
  typeof CreateReservationDailyMealInput
>
export type ReservationDailyMealType = z.infer<typeof ReservationDailyMeal>
export type CreateReservationDailyMealSetInputType = z.infer<
  typeof CreateReservationDailyMealSetInput
>
export type ReservationDailyMealSetType = z.infer<
  typeof ReservationDailyMealSet
>
export type UpdateReservationDailyMealSetInputType = z.infer<
  typeof UpdateReservationDailyMealSetInput
>

//Routers
const userRouter = t.router({
  createUser: t.procedure
    .input(User)
    .output(User)
    .mutation(async ({ input }) => {
      try {
        const user = await createUser(input)
        return user
      } catch (error) {
        throw handleTRPCError(error, "User")
      }
    }),
  updateUser: t.procedure
    .input(User)
    .output(User)
    .mutation(async ({ input }) => {
      try {
        const user = await updateUser(input)
        return user
      } catch (error) {
        throw handleTRPCError(error, "User")
      }
    }),
  viewUser: t.procedure
    .input(String)
    .output(User)
    .query(async ({ input }) => {
      try {
        const user = await viewUser({ id: input })
        return user
      } catch (error) {
        throw handleTRPCError(error, "User")
      }
    }),
  viewUserByEmail: t.procedure
    .input(String)
    .output(User)
    .query(async ({ input }) => {
      try {
        const user = await viewUserByEmail({ email: input })
        return user
      } catch (error) {
        throw handleTRPCError(error, "User")
      }
    }),
  viewAllUsers: t.procedure.output(z.array(User)).query(async () => {
    try {
      const users = await viewAllUsers()
      return users
    } catch (error) {
      throw handleTRPCError(error, "User")
    }
  })
})

const roomRouter = t.router({
  updateRoom: t.procedure
    .input(Room)
    .output(Room)
    .mutation(async ({ input }) => {
      try {
        const room = await updateRoom(input)
        return room
      } catch (error) {
        throw handleTRPCError(error, "Room")
      }
    }),
  viewRoom: t.procedure
    .input(z.number())
    .output(Room)
    .query(async ({ input }) => {
      try {
        const room = await viewRoom({ id: input })
        return room
      } catch (error) {
        throw handleTRPCError(error, "Room")
      }
    }),
  viewAllRooms: t.procedure.output(z.array(Room)).query(async () => {
    try {
      const rooms = await viewAllRooms()
      return rooms
    } catch (error) {
      throw handleTRPCError(error, "Room")
    }
  })
})

const mealRouter = t.router({
  createMeal: t.procedure
    .input(CreateMealInput)
    .output(Meal)
    .mutation(async ({ input }) => {
      try {
        const meal = await createMeal(input)
        return meal
      } catch (error) {
        throw handleTRPCError(error, "Meal")
      }
    }),
  updateMeal: t.procedure
    .input(Meal)
    .output(Meal)
    .mutation(async ({ input }) => {
      try {
        const meal = await updateMeal(input)
        return meal
      } catch (error) {
        throw handleTRPCError(error, "Meal")
      }
    }),
  viewMeal: t.procedure
    .input(z.number())
    .output(Meal)
    .query(async ({ input }) => {
      try {
        const meal = await viewMeal({ id: input })
        return meal
      } catch (error) {
        throw handleTRPCError(error, "Meal")
      }
    }),
  viewAllMeals: t.procedure.output(z.array(Meal)).query(async () => {
    try {
      const meals = await viewAllMeals()
      return meals
    } catch (error) {
      throw handleTRPCError(error, "Meal")
    }
  })
})

const mealPlanRouter = t.router({
  createMealPlan: t.procedure
    .input(CreateMealPlanInput)
    .output(MealPlan)
    .mutation(async ({ input }) => {
      try {
        const mealPlan = await createMealPlan(input)
        return mealPlan
      } catch (error) {
        throw handleTRPCError(error, "MealPlan")
      }
    }),
  updateMealPlan: t.procedure
    .input(MealPlan)
    .output(MealPlan)
    .mutation(async ({ input }) => {
      try {
        const mealPlan = await updateMealPlan(input)
        return mealPlan
      } catch (error) {
        throw handleTRPCError(error, "MealPlan")
      }
    }),
  viewMealPlan: t.procedure
    .input(z.number())
    .output(MealPlan)
    .query(async ({ input }) => {
      try {
        const mealPlan = await viewMealPlan({ id: input })
        return mealPlan
      } catch (error) {
        throw handleTRPCError(error, "MealPlan")
      }
    }),
  viewAllMealPlans: t.procedure.output(z.array(MealPlan)).query(async () => {
    try {
      const mealPlans = await viewAllMealPlans()
      return mealPlans
    } catch (error) {
      throw handleTRPCError(error, "MealPlan")
    }
  })
})

export const reservationRouter = t.router({
  createReservation: t.procedure
    .input(CreateReservationInput)
    .output(Reservation)
    .mutation(async ({ input }) => {
      try {
        const reservation = await createReservation(input)
        return reservation
      } catch (error) {
        throw handleTRPCError(error, "Reservation")
      }
    }),
  updateReservation: t.procedure
    .input(UpdateReservationInput)
    .output(Reservation)
    .mutation(async ({ input }) => {
      try {
        const reservation = await updateReservation(input)
        return reservation
      } catch (error) {
        throw handleTRPCError(error, "Reservation")
      }
    }),
  viewReservation: t.procedure
    .input(z.number())
    .output(Reservation)
    .query(async ({ input }) => {
      try {
        const reservation = await viewReservation({ id: input })
        return reservation
      } catch (error) {
        throw handleTRPCError(error, "Reservation")
      }
    }),
  viewAllCustomerReservations: t.procedure
    .input(z.string())
    .output(z.array(Reservation))
    .query(async ({ input }) => {
      try {
        const reservation = await viewAllCustomerReservations({
          customerId: input
        })
        return reservation
      } catch (error) {
        throw handleTRPCError(error, "Reservation")
      }
    }),
  viewAllReservations: t.procedure
    .output(z.array(Reservation))
    .query(async () => {
      try {
        const reservations = await viewAllReservations()
        return reservations
      } catch (error) {
        throw handleTRPCError(error, "Reservation")
      }
    })
})

const reservationDailyMealRouter = t.router({
  createReservationDailyMeal: t.procedure
    .input(CreateReservationDailyMealInput)
    .output(ReservationDailyMeal)
    .mutation(async ({ input }) => {
      try {
        const reservationDailyMeal = await createReservationDailyMeal(input)
        return reservationDailyMeal
      } catch (error) {
        throw handleTRPCError(error, "ReservationDailyMeal")
      }
    }),
  updateReservationDailyMeal: t.procedure
    .input(ReservationDailyMeal)
    .output(ReservationDailyMeal)
    .mutation(async ({ input }) => {
      try {
        const updatedReservationDailyMeal = await updateReservationDailyMeal(
          input
        )
        return updatedReservationDailyMeal
      } catch (error) {
        throw handleTRPCError(error, "ReservationDailyMeal")
      }
    }),
  viewReservationDailyMeal: t.procedure
    .input(z.number())
    .output(ReservationDailyMeal)
    .query(async ({ input }) => {
      try {
        const reservationDailyMeal = await viewReservationDailyMeal({
          id: input
        })
        return reservationDailyMeal
      } catch (error) {
        throw handleTRPCError(error, "ReservationDailyMeal")
      }
    }),
  viewAllReservationDailyMeals: t.procedure
    .output(z.array(ReservationDailyMeal))
    .query(async () => {
      try {
        const allReservationDailyMeals = await viewAllReservationDailyMeals()
        return allReservationDailyMeals
      } catch (error) {
        throw handleTRPCError(error, "ReservationDailyMeal")
      }
    })
})

const reservationDailyMealSetRouter = t.router({
  createReservationDailyMealSet: t.procedure
    .input(CreateReservationDailyMealSetInput)
    .output(ReservationDailyMealSet)
    .mutation(async ({ input }) => {
      try {
        const newReservationDailyMealSet = await createReservationDailyMealSet(
          input
        )
        return newReservationDailyMealSet
      } catch (error) {
        throw handleTRPCError(error, "ReservationDailyMealSet")
      }
    }),
  updateReservationDailyMealSet: t.procedure
    .input(UpdateReservationDailyMealSetInput)
    .output(ReservationDailyMealSet)
    .mutation(async ({ input }) => {
      try {
        const updatedReservationDailyMealSet =
          await updateReservationDailyMealSet(input)
        return updatedReservationDailyMealSet
      } catch (error) {
        throw handleTRPCError(error, "ReservationDailyMealSet")
      }
    }),
  viewReservationDailyMealSet: t.procedure
    .input(z.number())
    .output(ReservationDailyMealSet)
    .query(async ({ input }) => {
      try {
        const reservationDailyMealSet = await viewReservationDailyMealSet({
          id: input
        })
        return reservationDailyMealSet
      } catch (error) {
        throw handleTRPCError(error, "ReservationDailyMealSet")
      }
    }),
  viewAllReservationDailyMealSets: t.procedure
    .output(z.array(ReservationDailyMealSet))
    .query(async () => {
      try {
        const allReservationDailyMealSets =
          await viewAllReservationDailyMealSets()
        return allReservationDailyMealSets
      } catch (error) {
        throw handleTRPCError(error, "ReservationDailyMealSet")
      }
    })
})

//Nested Router
export const trpcRouter = t.router({
  user: userRouter,
  room: roomRouter,
  meal: mealRouter,
  mealplan: mealPlanRouter,
  reservation: reservationRouter,
  reservationDailyMeal: reservationDailyMealRouter,
  reservationDailyMealSet: reservationDailyMealSetRouter
})

export type TRPCRouter = typeof trpcRouter
