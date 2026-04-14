const express = require('express');
const router = express.Router();

// In-memory data store
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: '1984', author: 'George Orwell' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

let nextId = 4;

// GET /books - Return all books
router.get('/', (req, res) => {
  res.json({
    message: 'Books retrieved successfully',
    data: books
  });
});

// POST /books - Add a new book
router.post('/', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      message: 'Title and author are required',
      data: null
    });
  }

  const newBook = {
    id: nextId++,
    title,
    author
  };

  books.push(newBook);

  res.status(201).json({
    message: 'Book created successfully',
    data: newBook
  });
});

// PUT /books/:id - Update entire book
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      message: 'Book not found',
      data: null
    });
  }

  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      message: 'Title and author are required',
      data: null
    });
  }

  books[bookIndex] = { id, title, author };

  res.json({
    message: 'Book updated successfully',
    data: books[bookIndex]
  });
});

// PATCH /books/:id - Partially update book
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      message: 'Book not found',
      data: null
    });
  }

  const { title, author } = req.body;

  if (title) books[bookIndex].title = title;
  if (author) books[bookIndex].author = author;

  res.json({
    message: 'Book updated successfully',
    data: books[bookIndex]
  });
});

// DELETE /books/:id - Delete a book
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      message: 'Book not found',
      data: null
    });
  }

  const deletedBook = books.splice(bookIndex, 1);

  res.json({
    message: 'Book deleted successfully',
    data: deletedBook[0]
  });
});

module.exports = router;
