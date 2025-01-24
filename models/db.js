// const { MongoClient } = require('mongodb');
const dbURL = process.env.ATLAS_URI;
const mongoose = require("mongoose");

// let db;
// async function connectToDB() {
//   try {
//     const client = new MongoClient(dbURL, { useUnifiedTopology: true });
//     await client.connect();
//     console.log('Connected to MongoDB');
//     db = client.db("cs355db");
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     throw error;
//   }
// }

// function getCollection(collectionName) {
//   if (!db) {
//     throw new Error('Database connection not established. Call connectToDB first.');
//   }
//   return db.collection(collectionName);
// }

// module.exports = {
//   connectToDB,
//   getCollection,
// };


// MongoDB Connection
// mongoose.connect("mongodb://127.0.0.1:27017/quizApp", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error("MongoDB connection error:", err));