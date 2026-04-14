const express = require("express");
const router = express.Router();

// In-memory storage for books
let books = [];
let nextId = 1; // Auto-increment counter

// GET /books - Return all books
router.get("/", (req, res) => {
  res.json({
    message: "Books retrieved successfully",
    count: books.length,
    data: books,
  });
});

// POST /books - Add a new book
router.post("/", (req, res) => {
  const { title, author } = req.body;

  // Validate required fields
  if (!title || !author) {
    return res.status(400).json({
      message: "Title and author are required",
    });
  }

  const newBook = {
    id: nextId++,
    title,
    author,
  };

  books.push(newBook);

  res.status(201).json({
    message: "Book added successfully",
    data: newBook,
  });
});

// PUT /books/:id - Full update of a book
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  // Validate required fields
  if (!title || !author) {
    return res.status(400).json({
      message: "Title and author are required",
    });
  }

  // Find book index
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  // Replace entire book
  const updatedBook = {
    id,
    title,
    author,
  };

  books[bookIndex] = updatedBook;

  res.json({
    message: "Book updated successfully",
    data: updatedBook,
  });
});

// PATCH /books/:id - Partial update of a book
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  // Find book index
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  // Merge existing book with updates (only provided fields)
  books[bookIndex] = { ...books[bookIndex], ...updates };

  res.json({
    message: "Book partially updated successfully",
    data: books[bookIndex],
  });
});

// DELETE /books/:id - Delete a book
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Find book index
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  // Remove book
  books.splice(bookIndex, 1);

  res.json({
    message: "Book deleted successfully",
  });
});

module.exports = router;
