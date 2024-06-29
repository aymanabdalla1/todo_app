const express = require('express'); // Import express
const router = express.Router(); // Make a router (router is like a mini app)
const {getConnectedClient} = require('./database'); // Import the getConnectedClient function from the database file
const { ObjectId } = require('mongodb'); // Import the ObjectId from the mongodb package

const getCollection = () => {
    const client = getConnectedClient(); // Get the connected client
    const collection = client.db("Todo").collection("Todo"); // Get the collection from the database
    return collection; // Return the collection
}

// KEYWORDS FOR REST API **** 
// GET /todos is for reading all todos
router.get('/todos', async (req, res) => {
    const collection = getCollection(); // Get the collection
    const todos = await collection.find({}).toArray(); // Find all todos and convert them to an array

    res.status(200).json(todos)
});

// POST /todos post is for creating, so we will create a new todo
router.post('/todos', async (req, res) => {
    const collection = getCollection(); // Get the collection
    const {todo} = req.body; // Get the todo from the request body

    if (!todo) { // If there is no todo
        return res.status(400).json({error: "Todo is required"}); // Send a response with an error message
    }
    todo = JSON.stringify(todo); // Convert the todo to a string

    const newTodo = await collection.insertOne({todo, status: false}); // Insert the todo into the collection, false is incomplete

    console.log(todo); // Log the todo to the console
    res.status(201).json({todo, status: false, _id: newTodo.insertedId}) // Send a response with the todo and status"})
});

// DELETE /todos/:id is for deleting a todo
router.delete('/todos/:id', async (req, res) => {
    const collection = getCollection(); // Get the collection
    const _id = new ObjectId(req.params.id); // Get the id from the request parameters

    const deleteTodo = await collection.deleteOne({_id}); // Delete the todo with the id
    res.status(200).json(deleteTodo) // Send a response with the deleted todo
});

// PUT /todos/:id is for updating a todo
router.put('/todos/:id', async (req, res) => {
    const collection = getCollection(); // Get the collection
    const _id = new ObjectId(req.params.id); // Get the id from the request parameters
    const {status} = req.body; // Get the status from the request body

    if (typeof status !== "boolean") { // If the status is not a boolean
        return res.status(400).json({error: "Status must be a boolean"}); // Send a response with an error message
     } 
    const updateTodo = await collection.updateOne({_id}, {$set: {staus: !status}}); // Update the todo with the id
    res.status(200).json(updateTodo)
});

module.exports = router; // Export the router