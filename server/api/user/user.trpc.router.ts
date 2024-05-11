import { t } from "../../../server/server"
import {
  createUser,
  updateUser,
  viewUser,
  viewUserByEmail,
  viewAllUsers
} from "./controllers"
import { z } from "zod"
import handleTRPCError from "../../../utils/handleTRPCError"

export const User = z.object({
  id: z.string(),
  firstName: z.string(),
  familyName: z.string(),
  nic: z.string(),
  email: z.string().email()
})

export const userRouter = t.router({
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
