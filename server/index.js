const express = require('express'); // import express to be able to be used
const app = express(); // create an instance of express and store it in a variable called app

//request = sends data to the server | response = sends data back to the client
const router = require('./routes'); // import the router from the routes file
app.use('/api', router);           // use the router for all routes that start with /api, at /api endpoint use router

const port = 5000; // create a variable called port and set it to 5000
// start the server on port 5000 and log a message to the console when the server is running
app.listen(port, () => { 
    //${} is a template that allows you to use variables inside of a string
    console.log(`Server is listening on http://localhost:${port}`); 
}); 
