const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

// Connect to DB
connectDB();

// Initialize app
const app = express();

// CORS configuration
const corsOptions = {
  origin: true, // Allow all origins
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

// Middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to Support Desk" });
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

// // Serve Frontend
// if (process.env.NODE_ENV === "production") {
//   // Set build folder as static
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   // FIX: below code fixes app crashing on refresh in deployment
//   app.get("*", (_, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.status(200).json({ message: "Welcome to the Support Desk API" });
//   });
// }

// Error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`server started on Port ${PORT}`);
});