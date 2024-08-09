const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

let rooms = [];
let bookings = [];

function isRoomAvailable(roomId, date, startTime, endTime) {
  return !bookings.some(
    (booking) =>
      booking.roomId === roomId &&
      booking.date === date &&
      startTime < booking.endTime &&
      endTime > booking.startTime
  );
}

app.post("/rooms", (req, res) => {
  const { numberOfSeats, amenities, pricePerHour } = req.body;
  const roomId = rooms.length + 1;
  const newRoom = { roomId, numberOfSeats, amenities, pricePerHour };
  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

app.post("/bookings", (req, res) => {
  const { customerName, date, startTime, endTime, roomId } = req.body;
  if (!isRoomAvailable(roomId, date, startTime, endTime)) {
    return res
      .status(400)
      .json({ message: "Room is already booked for this time slot" });
  }
  const bookingId = bookings.length + 1;
  const newBooking = {
    bookingId,
    customerName,
    date,
    startTime,
    endTime,
    roomId,
  };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

app.get("/rooms", (req, res) => {
  const detailedRooms = rooms.map((room) => {
    const roomBookings = bookings.filter((b) => b.roomId === room.roomId);
    return {
      ...room,
      bookings: roomBookings,
    };
  });
  res.json(detailedRooms);
});

app.get("/customers", (req, res) => {
  const detailedBookings = bookings.map((booking) => {
    const room = rooms.find((r) => r.roomId === booking.roomId);
    return {
      customerName: booking.customerName,
      roomName: room ? `Room ${room.roomId}` : "Unknown",
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
    };
  });
  res.json(detailedBookings);
});

app.get("/customer-bookings", (req, res) => {
  const { customerName } = req.query;
  const customerBookings = bookings.filter(
    (b) => b.customerName === customerName
  );
  const roomBookingStats = customerBookings.map((booking) => {
    const room = rooms.find((r) => r.roomId === booking.roomId);
    return {
      customerName: booking.customerName,
      roomName: room ? `Room ${room.roomId}` : "Unknown",
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      bookingId: booking.bookingId,
      bookingDate: new Date(),
      bookingStatus: "Confirmed",
    };
  });
  res.json(roomBookingStats);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
