const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Import routes
const bookRoutes = require("./routes/books");

// Use routes
app.use("/books", bookRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Books REST API",
    endpoints: {
      "GET /books": "Get all books",
      "POST /books": "Add a new book",
      "PUT /books/:id": "Update a book (full)",
      "PATCH /books/:id": "Update a book (partial)",
      "DELETE /books/:id": "Delete a book"
    }
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});