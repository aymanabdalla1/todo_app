require("dotenv").config(); // import the dotenv package and configure it
const { MongoClient, ServerApiVersion, StreamDescription } = require("mongodb"); // import the MongoClient and ServerApiVersion from the mongodb package

// this will be the secret database connection string in .env file
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/"; // create a variable called uri and set it to the MONGO_URI from the .env file
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
}

let client; // create a variable called client
const connectToMongoDB = async () => { // create an async function called connectToMongoDB
    if (!client) { // if there is no client, create new mongo client
        try {
            client = await MongoClient.connect(uri, options); // connect to the MongoDB database defined above
            console.log("Connected to MongoDB"); // log a message to the console after connecting to the database
        } catch (error) {
            console.error(error); // log the error to the console
        }
    }
    return client; // return the client
};

const getConnectedClient = () => client; // create a function called getConnectedClient that returns the client

module.exports = { connectToMongoDB, getConnectedClient }; // export the connectToMongoDB and getConnectedClient functions