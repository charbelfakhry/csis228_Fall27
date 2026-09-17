const express = require("express");
const cors = require("cors");

require("dotenv").config();

const pool = require("./config/db");

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
app.get("/users", async(req, res) =>{
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
});

app.get("/users/:id", async (req, res) =>{
    const {id} = req.params;
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
    console.log(result.rows.length);
    if(result.rows.length === 0){
        res.status(404).json({error: "User not found"});
    }
    res.status(200).json(result.rows[0])
})

app.post("/createUser", async(req, res) => {
    const {firstName, lastName, dob} = req.body;
    const result = await insertUser(firstName, lastName, dob);
    res.status(201).json(result)
});

app.get("/bulkInsertUser", async(req, res) => {
    for(let i = 0; i < 1000; i++)
    {
        await insertUser(`fn ${i}`, `ln ${i}`, "2003-03-03");
    }

    res.status(200).json({message: "Bulk insert completed succssfully!"});
})

const insertUser = async (firstName, lastName, dob) =>{
    const result = await pool.query(
        "INSERT INTO users (user_first_name, user_last_name, user_dob) VALUES ($1, $2, $3) RETURNING *",
         [firstName, lastName, dob]);
        
    return result.rows[0];
} 

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})


