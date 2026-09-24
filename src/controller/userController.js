const userService = require("../service/userService");


const getUsers = async(req, res) =>{
    const users = await userService.getAllUsers();
    res.status(200).json(users);
}

const getUser = async(req, res) =>{
    const id = req.params.id

    const user = await userService.getUserById(id);

    if(!user){
        return res.status(404).json({message: `User ${id} does not exist`})
    }

    res.status(200).json(user);
}

const createUser = async (req, res) =>{
    const {firstName, lastName, dob} = req.body;

    if(!firstName || !lastName || !dob){
        return res.status(400).json({
            message: "firstName, lastName and DOB are required"
        })
    }

    const user = await userService.createUser({firstName, lastName, dob});

    res.status(201).json(user);
}

const updateUser = async(req, res) =>{
    const id = req.params.id;
    const {firstName, lastName, dob} = req.body;

    if(!id || !firstName || !lastName || !dob){
        return res.status(400).json({
            message: "Missing data"
        });
    }

    const user = await userService.updateUser(id, {firstName, lastName, dob})

    if(!user){
        return res.status(404).json({message: `User ${id} does not exist`})
    }

    res.status(200).json(user);
}

const deleteUser = async(req, res) => {
    const id = req.params.id;

    const deleted = await userService.deleteUser(id);
    if(!deleted){
        return res.status(404).json("User not found");
    }

    res.status(200).json({message: "User deleted Successfully!"});
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}
