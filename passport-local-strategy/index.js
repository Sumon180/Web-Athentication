require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectDB();
});
