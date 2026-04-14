const express = require('express');
const booksRouter = require('./routes/books');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/books', booksRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
