const userService = require("../service/userService");


const getUsers = async(req, res, next) =>{
    try{
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    }catch(error){
        next(error);
    }
}

const getUser = async(req, res, next) =>{
    try{
        const id = req.params.id

        const user = await userService.getUserById(id);

        if(!user){
            return res.status(404).json({message: `User ${id} does not exist`})
        }

        res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

const createUser = async (req, res, next) =>{
    try{
        const {firstName, lastName, dob} = req.body;

        const user = await userService.createUser({firstName, lastName, dob});

        res.status(201).json(user);
    }catch(error){
        next(error);
    }
}

const updateUser = async(req, res, next) =>{
    try{
        const id = req.params.id;
        const {firstName, lastName, dob} = req.body;

        const user = await userService.updateUser(id, {firstName, lastName, dob})

        if(!user){
            return res.status(404).json({message: `User ${id} does not exist`})
        }

        res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

const deleteUser = async(req, res, next) => {
    try{
        const id = req.params.id;

        const deleted = await userService.deleteUser(id);
        if(!deleted){
            return res.status(404).json("User not found");
        }

        res.status(200).json({message: "User deleted Successfully!"});
    }catch(error){
        next(error);
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}
