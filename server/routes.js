const express = require('express'); // Import express
const router = express.Router(); // Make a router (router is like a mini app)
  
// KEYWORDS FOR REST API **** 
// GET /todos is for reading all todos
router.get('/todos', (req, res) => {
  res.status(200).json({msg: "GET REQUEST TO /api/todos"})
});

// POST /todos post is for creating, so we will create a new todo
router.post('/todos', (req, res) => {
    res.status(201).json({msg: "POST REQUEST TO /api/todos"})
});

// DELETE /todos/:id is for deleting a todo
router.delete('/todos/:id', (req, res) => {
    res.status(200).json({msg: `DELETE REQUEST TO /api/todos/:id`})
});

// PUT /todos/:id is for updating a todo
router.put('/todos/:id', (req, res) => {
    res.status(200).json({msg: `POST REQUEST TO /api/todos/:id`})
});

module.exports = router; // Export the router