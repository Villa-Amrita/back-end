// import { t } from "../../../server/server"
// import { z } from "zod"
// import { updateRoom, viewRoom, viewAllRooms } from "./controllers"
// import handleTRPCError from "../../../utils/handleTRPCError"

// export const Room = z.object({
//   id: z.number(),
//   roomName: z.string(),
//   roomSize: z.number(),
//   roomDescription: z.string(),
//   roomConditions: z.string(),
//   roomPrice: z.number()
// })

// export const roomRouter = t.router({
//   updateRoom: t.procedure
//     .input(Room)
//     .output(Room)
//     .mutation(async ({ input }) => {
//       try {
//         const room = await updateRoom(input)
//         return room
//       } catch (error) {
//         throw handleTRPCError(error, "Room")
//       }
//     }),
//   viewRoom: t.procedure
//     .input(z.number())
//     .output(Room)
//     .query(async ({ input }) => {
//       try {
//         const room = await viewRoom({ id: input })
//         return room
//       } catch (error) {
//         throw handleTRPCError(error, "Room")
//       }
//     }),
//   viewAllRooms: t.procedure.output(z.array(Room)).query(async () => {
//     try {
//       const rooms = await viewAllRooms()
//       return rooms
//     } catch (error) {
//       throw handleTRPCError(error, "Room")
//     }
//   })
// })
