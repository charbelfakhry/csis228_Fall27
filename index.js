const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

var users = [];

app.get("/test", (req, res) => {

    res.json({message: "hello world"})
    
});

app.get("/hello", (req, res) =>{
    res.json({message: "hello"})
})

// callback a function inside a function
app.get("/users", (req, res) =>{
    res.json(users);
});

app.post("/createUser", (req, res) => {
    const {firstName, lastName} = req.body;
    users.push({
        firstName,
        lastName
    });
    res.json({message: "user created"})
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})


