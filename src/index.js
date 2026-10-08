const express = require("express");
const userRoutes = require("./route/user.route");
const productRoutes = require("./route/product.route");
const cors = require("cors");

require("dotenv").config();
const {notFoundHandler, errorHandler} = require("./middleware/errorHandler");

const app = express();

app.use(cors());

app.use(express.json());



app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.send("API is running on localhost");
})

// must be registered after all routes
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if(error){
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }

    console.log(`Server is running on ${PORT}`);
})

