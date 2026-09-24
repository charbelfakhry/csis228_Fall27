const userRepository = require("../repository/userRepository");

const getAllUsers = () => {
    return userRepository.getAll();
}

const getUserById = (id) =>{
    return userRepository.getById(id);
}

const createUser = (user) =>{
    return userRepository.create(user);
}

const updateUser = (id, user) =>{
    return userRepository.update(id, user);
}

const deleteUser = (id) =>{
    return userRepository.deleteUser(id);
}

module.exports = {
    getAllUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
