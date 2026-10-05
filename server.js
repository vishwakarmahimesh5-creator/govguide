const express = require("express");
const path = require("path");

require("./config/db");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "static-site")));

app.use("/api", userRoutes);

app.listen(3000, () => {
    console.log("Server Running");
});