const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/test", (req, res) => {

    res.json({message: "hello world"})
    
});

// callback a function inside a function
app.get("/", (req, res) =>{
    // body of the callback

    res.json(dummyUsers());
});

const dummyUsers = () => {
    const users = [];

    for(let i = 0; i < 10000; i++)
    {
        users.push({
            id: i,
            name: `name ${i}`
        });
    }

    return users;
}

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})


