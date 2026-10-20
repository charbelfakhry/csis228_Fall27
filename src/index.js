// load .env first so every module below sees the variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const userRoutes = require("./route/user.route");
const productRoutes = require("./route/product.route");
const {notFoundHandler, errorHandler} = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// must be registered after all routes
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if(error){
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }

    console.log(`Server is running on http://localhost:${PORT}`);
});
