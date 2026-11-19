// load .env first so every module below sees the variables
require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./route/user.route");
const productRoutes = require("./route/product.route");
const productViewRoutes = require("./route/product.view.route");
const userViewRoutes = require("./route/user.view.route");
const {notFoundHandler, errorHandler} = require("./middleware/errorHandler");

const app = express();

// views live in src/views; res.render("products/index") -> src/views/products/index.ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json());
// HTML forms send application/x-www-form-urlencoded, not JSON
app.use(express.urlencoded({extended: false}));
// CSS, images and client JS from src/public, e.g. /css/style.css
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("home", {title: "CSIS228 Store"});
});

// JSON API
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// server-rendered pages (same services as the API)
app.use("/products", productViewRoutes);
app.use("/users", userViewRoutes);

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
