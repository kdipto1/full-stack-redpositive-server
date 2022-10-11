require("dotenv").config();
const express = require("express")
const app = express()
const port = process.env.PORT || 5000;
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());









//Test purpose api
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});