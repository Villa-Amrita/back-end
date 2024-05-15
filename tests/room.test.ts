import { test, expect } from "vitest"
import makeRequest from "./makeRequests"

const initialRoomData = {
  roomName: "Test Room",
  roomSize: 20,
  roomDescription: "A comfortable room for testing purposes",
  roomConditions: "Excellent",
  roomPrice: 100
}

const updatedRoomData = {
  roomName: "Updated Test Room",
  roomSize: 25, // Updated value
  roomDescription: "An even better room for testing!",
  roomConditions: "Excellent",
  roomPrice: 120 // Updated value
}

test("updateRoom updates an existing room", async () => {
  // 1. View the room to get its ID (assuming you can't directly provide it)
  const viewResponse = await makeRequest(
    "http://localhost:8080/api/room/viewAll",
    "GET"
  )
  expect(viewResponse.status).toBe(200)
  const viewData = await viewResponse.json()
  const roomToUpdate = viewData.data[0] // Assuming the first room is used for testing

  // 2. Update the room with updated data
  const updateResponse = await makeRequest(
    `http://localhost:8080/api/room/update`,
    "PUT",
    { ...updatedRoomData, id: roomToUpdate.id } // Include retrieved ID
  )
  expect(updateResponse.status).toBe(200)
  const updateData = await updateResponse.json()
  expect(updateData).toHaveProperty("message")
  expect(updateData.message).toBe("Room Updated")

  // 3. Assert properties of the updated room (assuming it's returned in the response)
  expect(updateData).toHaveProperty("data")
  expect(updateData.data.id).toBe(roomToUpdate.id) // ID should remain the same
  expect(updateData.data.roomName).toBe(updatedRoomData.roomName)
  expect(updateData.data.roomSize).toBe(updatedRoomData.roomSize)
  expect(updateData.data.roomDescription).toBe(updatedRoomData.roomDescription)
  expect(updateData.data.roomConditions).toBe(updatedRoomData.roomConditions)
  expect(updateData.data.roomPrice).toBe(updatedRoomData.roomPrice)
})
