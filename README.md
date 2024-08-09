# Hall Booking Application

## Overview
This is a Hall Booking Application built using Node.js and Express. The application allows you to manage rooms, book rooms, and view bookings.

## Features
- **Create Rooms**: Add new rooms with seat availability, amenities, and pricing.
- **Book Rooms**: Make bookings for available rooms.
- **List Rooms**: View all rooms with their booking details.
- **List Customers**: View all customers and their bookings.
- **Customer Booking Statistics**: View the booking history of a specific customer.

## API Endpoints

- **Create Room**
  - `POST /rooms`
  - **Request Body**
    ```json
    {
      "numberOfSeats": 50,
      "amenities": ["Projector", "Sound System"],
      "pricePerHour": 150
    }
    ```
  - **Response**
    ```json
    {
      "roomId": 1,
      "numberOfSeats": 50,
      "amenities": ["Projector", "Sound System"],
      "pricePerHour": 150
    }
    ```

- **Book Room**
  - `POST /bookings`
  - **Request Body**
    ```json
    {
      "customerName": "Alice Johnson",
      "date": "2024-08-15",
      "startTime": "09:00",
      "endTime": "11:00",
      "roomId": 1
    }
    ```
  - **Response**
    ```json
    {
      "bookingId": 1,
      "customerName": "Alice Johnson",
      "date": "2024-08-15",
      "startTime": "09:00",
      "endTime": "11:00",
      "roomId": 1
    }
    ```

- **List All Rooms**
  - `GET /rooms`
  - **Response**
    ```json
    [
      {
        "roomId": 1,
        "numberOfSeats": 50,
        "amenities": ["Projector", "Sound System"],
        "pricePerHour": 150,
        "bookings": [
          {
            "bookingId": 1,
            "customerName": "Alice Johnson",
            "date": "2024-08-15",
            "startTime": "09:00",
            "endTime": "11:00"
          }
        ]
      }
    ]
    ```

- **List All Customers**
  - `GET /customers`
  - **Response**
    ```json
    [
      {
        "customerName": "Alice Johnson",
        "roomName": "Room 1",
        "date": "2024-08-15",
        "startTime": "09:00",
        "endTime": "11:00"
      }
    ]
    ```

- **List Customer Bookings**
  - `GET /customer-bookings?customerName=Alice Johnson`
  - **Response**
    ```json
    [
      {
        "customerName": "Alice Johnson",
        "roomName": "Room 1",
        "date": "2024-08-15",
        "startTime": "09:00",
        "endTime": "11:00",
        "bookingId": 1,
        "bookingDate": "2024-08-09T10:00:00Z",
        "bookingStatus": "Confirmed"
      }
    ]
    ```

## Documentation
The Postman documentation for this API can be accessed at:
[Postman Documentation](https://documenter.getpostman.com/view/37539382/2sA3s1psMH)

