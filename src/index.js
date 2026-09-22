const express = require("express");
const userRoutes = require("./route/user.route");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());



app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("API is running on localhost");
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})


