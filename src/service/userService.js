const userRepository = require("../repository/userRepository");
const {NotFoundError} = require("../errors/AppError");

// business rules live here; "not found" is decided once instead of in every controller
const getAll = () => {
    return userRepository.getAll();
}

const getById = async (id) => {
    const user = await userRepository.getById(id);
    if(!user){
        throw new NotFoundError(`User ${id} not found`);
    }
    return user;
}

const create = (user) => {
    return userRepository.create(user);
}

const update = async (id, user) => {
    const updated = await userRepository.update(id, user);
    if(!updated){
        throw new NotFoundError(`User ${id} not found`);
    }
    return updated;
}

const remove = async (id) => {
    const deleted = await userRepository.remove(id);
    if(!deleted){
        throw new NotFoundError(`User ${id} not found`);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
