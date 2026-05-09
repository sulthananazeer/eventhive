// Load environment variables from .env file before any other code runs
// This allows us to access sensitive configuration like API keys and database credentials
require("dotenv").config();

// Import Express for the web framework and CORS for Cross-Origin Resource Sharing
// Express handles routing and middleware, CORS allows requests from different origins
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Create an Express application instance
const app = express();

// Add middleware to handle CORS and parse JSON request bodies
// cors() enables cross-origin requests from frontend applications
// express.json() parses incoming requests with JSON payloads
app.use(cors());
app.use(express.json());

// Mount auth routes under /api/auth
app.use("/api/auth", require("./routes/authRoutes"));

// Define a health check endpoint that returns the server status and current time
// This is useful for monitoring and verifying the server is running
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// Start the server on the configured port or default to 5000
// process.env.PORT allows deployment platforms to specify their preferred port
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();