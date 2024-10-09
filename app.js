// app.js
const express = require("express");
// const cors = require("cors");
const authroute=require("./routes/auth.routes")
const userRoute=require("./routes/user.routes");

const app = express();
// const corsOptions = {
//   origin: "http://localhost:3001"
// };

// app.use(cors(corsOptions));
app.use(express.json());

// Import Sequelize models
const db = require('./models');
// const Role = db.role;

// Initialize Sequelize connection and sync models
db.sequelize.sync()
  .then(() => {
    console.log("Synced with MySQL database.");
      // Initialize roles if needed
  })
  .catch(err => {
    console.error("Failed to sync with database:", err);
  });

// Initialize roles in the database if they don't exist

// Simple route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the backend.");
});
app.use('/api/v1/users',authroute)
app.use('/api/v1/users',userRoute)

//app.use('/api/v1/users',userRouter)
// Set port and start listening for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}.`);
});
