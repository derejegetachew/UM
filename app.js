// app.js
const express = require("express");
// const cors = require("cors");

const app = express();
// const corsOptions = {
//   origin: "http://localhost:3001"
// };

// app.use(cors(corsOptions));
app.use(express.json());

// Import Sequelize models
const db = require('./models');
const Role = db.role;

// Initialize Sequelize connection and sync models
db.sequelize.sync()
  .then(() => {
    console.log("Synced with MySQL database.");
    initial();  // Initialize roles if needed
  })
  .catch(err => {
    console.error("Failed to sync with database:", err);
  });

// Initialize roles in the database if they don't exist
async function initial() {
  try {
    const count = await Role.count(); // Check how many records exist
    if (count === 0) {
      // Add roles to the database
      await Role.create({ name: "user" });
      await Role.create({ name: "moderator" });
      await Role.create({ name: "admin" });
      console.log("Added 'user', 'moderator', and 'admin' to the roles collection");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

// Simple route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the backend.");
});

// Set port and start listening for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}.`);
});
