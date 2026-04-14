# Books REST API

A simple REST API built with Node.js and Express to manage a list of books.

## Project Structure

```
Day 3 - Rest API/
├── routes/
│   └── books.js       # Book routes (CRUD operations)
├── server.js          # Express app entry point
├── package.json       # Project dependencies
└── README.md          # Documentation
```

## Getting Started

```bash
npm install
npm start
```

Server runs on `http://localhost:3000`

## API Endpoints

### 1. GET /books
Get all books.

### 2. POST /books
Create a new book.

**Request Body:**
```json
{
  "title": "Dune",
  "author": "Frank Herbert"
}
```

### 3. PUT /books/:id
Replace an entire book.

**Request Body:**
```json
{
  "title": "Dune (Updated)",
  "author": "Frank Herbert (Updated)"
}
```

### 4. PATCH /books/:id
Update specific fields only.

**Request Body:**
```json
{
  "title": "Dune (Partially Updated)"
}
```

### 5. DELETE /books/:id
Delete a book. No body required.

## Testing with Postman

1. Open Postman
2. Select the appropriate HTTP method (GET, POST, PUT, PATCH, DELETE)
3. Enter the URL: `http://localhost:3000/books` or `http://localhost:3000/books/1`
4. For POST/PUT/PATCH: Go to **Body** → **raw** → select **JSON** and paste the request body
5. Click **Send**

### Quick Test Sequence:
1. `GET http://localhost:3000/books` → See all books
2. `POST http://localhost:3000/books` with body `{"title": "New Book", "author": "Author Name"}` → Create a book
3. `PUT http://localhost:3000/books/1` with body `{"title": "Updated Title", "author": "Updated Author"}` → Replace book
4. `PATCH http://localhost:3000/books/1` with body `{"title": "Only Title Changed"}` → Partial update
5. `DELETE http://localhost:3000/books/1` → Delete book
6. `GET http://localhost:3000/books` → Verify changes
