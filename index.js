const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const routes = require("./src/Routes/routes"); // Adjust the path here
const mongoConnect = require("./src/config/mongoose");
const bodyParser = require("body-parser");

// To read form data

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "src/views");

// Routes
app.use("/", routes);

mongoConnect();
const port = process.env.PORT; // Default port 3000

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
