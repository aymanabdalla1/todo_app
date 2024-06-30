require("dotenv").config(); // import the dotenv package and configure it
const { connectToMongoDB } = require('./database'); // import the connectToMongoDB function from the database file
const express = require('express'); // import express to be able to be used
const path = require('path'); // import path to be able to be used

const app = express(); // create an instance of express and store it in a variable called app
app.use(express.json()); // use the express.json() middleware to parse incoming requests with JSON payloads
app.use(express.static(path.join(__dirname, "build"))); // use the express.static() middleware to serve static files from the client/build folder
app.get("/", (req, res) => { // create a route for the root URL
    res.sendFile(path.join(__dirname, "build", "index.html")); // send the index.html file from the client/build folder
}); // send the index.html file from the client/build folder

//request = sends data to the server | response = sends data back to the client
const router = require('./routes'); // import the router from the routes file
app.use('/api', router);           // use the router for all routes that start with /api, at /api endpoint use router

const port = process.env.PORT || 5000; // create a variable called port and set it to 5000

async function startServer() { // create an async function called startServer
    await connectToMongoDB(); // connect to the MongoDB database

    // start the server on port 5000 and log a message to the console when the server is running
    app.listen(port, () => { 
        //${} is a template that allows you to use variables inside of a string
        console.log(`Server is listening on http://localhost:${port}`); 
    }); 
}

startServer(); // call the startServer function



