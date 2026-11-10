const userRepository = require("../repository/userRepository");
const {NotFoundError} = require("../errors/AppError");
const {UserResponseDto} = require("../dto/UserDto");

// business rules live here; "not found" is decided once instead of in every controller
// services take request DTOs and return response DTOs, so models never leave this layer
const getAll = async () => {
    const users = await userRepository.getAll();
    return UserResponseDto.fromModels(users);
}

const getById = async (id) => {
    const user = await userRepository.getById(id);
    if(!user){
        throw new NotFoundError(`User ${id} not found`);
    }
    return UserResponseDto.fromModel(user);
}

const create = async (userDto) => {
    const user = await userRepository.create(userDto);
    return UserResponseDto.fromModel(user);
}

const update = async (id, userDto) => {
    const updated = await userRepository.update(id, userDto);
    if(!updated){
        throw new NotFoundError(`User ${id} not found`);
    }
    return UserResponseDto.fromModel(updated);
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
