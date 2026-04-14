# Books REST API

A simple REST API built with Node.js and Express to manage a list of books. This project demonstrates CRUD (Create, Read, Update, Delete) operations using in-memory storage.

## Project Structure

```
Day 3 - Rest API/
├── Server.js           # Main server file
├── routes/
│   └── books.js        # Book routes (CRUD operations)
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   node Server.js
   ```

3. **Server runs on:** `http://localhost:3000`

## API Endpoints

### 1. GET /books
Retrieve all books.

**Request:**
```
GET http://localhost:3000/books
```

**Response (200 OK):**
```json
{
  "message": "Books retrieved successfully",
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald"
    },
    {
      "id": 2,
      "title": "1984",
      "author": "George Orwell"
    }
  ]
}
```

---

### 2. POST /books
Add a new book (ID is auto-generated).

**Request:**
```
POST http://localhost:3000/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald"
}
```

**Response (201 Created):**
```json
{
  "message": "Book added successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Title and author are required"
}
```

---

### 3. PUT /books/:id
Fully update a book (all fields required).

**Request:**
```
PUT http://localhost:3000/books/1
Content-Type: application/json

{
  "title": "The Great Gatsby (Updated)",
  "author": "F. Scott Fitzgerald"
}
```

**Response (200 OK):**
```json
{
  "message": "Book updated successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby (Updated)",
    "author": "F. Scott Fitzgerald"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Book not found"
}
```

---

### 4. PATCH /books/:id
Partially update a book (only send fields you want to change).

**Request:**
```
PATCH http://localhost:3000/books/1
Content-Type: application/json

{
  "title": "The Great Gatsby (Revised)"
}
```

**Response (200 OK):**
```json
{
  "message": "Book partially updated successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby (Revised)",
    "author": "F. Scott Fitzgerald"
  }
}
```

---

### 5. DELETE /books/:id
Delete a book by ID.

**Request:**
```
DELETE http://localhost:3000/books/1
```

**Response (200 OK):**
```json
{
  "message": "Book deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Book not found"
}
```

---

## Testing with Postman

### Step 1: Import/Setup
1. Open Postman
2. Create a new Collection named "Books API"

### Step 2: Create Requests

**Add Books (POST):**
- Method: `POST`
- URL: `http://localhost:3000/books`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald"
}
```
- Send 2-3 requests with different books

**Get All Books (GET):**
- Method: `GET`
- URL: `http://localhost:3000/books`
- Send

**Update a Book (PUT):**
- Method: `PUT`
- URL: `http://localhost:3000/books/1`
- Body (raw JSON):
```json
{
  "title": "The Great Gatsby (Updated Edition)",
  "author": "F. Scott Fitzgerald"
}
```

**Partially Update (PATCH):**
- Method: `PATCH`
- URL: `http://localhost:3000/books/1`
- Body (raw JSON):
```json
{
  "author": "Francis Scott Fitzgerald"
}
```

**Delete a Book (DELETE):**
- Method: `DELETE`
- URL: `http://localhost:3000/books/1`
- Send

### Step 3: Verify
- After each request, check the response body and status code
- Use GET /books between operations to see the current state

## Key Features

- ✅ Auto-generated IDs for new books
- ✅ Input validation (title and author required)
- ✅ Proper HTTP status codes (200, 201, 400, 404)
- ✅ Consistent JSON response format
- ✅ Modular route structure
- ✅ PUT for full updates, PATCH for partial updates
- ✅ 404 handler for undefined routes

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **express.json()** - Middleware for parsing JSON

## Notes

- Data is stored in memory (resets when server restarts)
- IDs are auto-incremented starting from 1
- This is a beginner-friendly example; production APIs would use a database
