const userService = require("../service/userService");
const {UserRequestDto} = require("../dto/UserDto");

// controllers only translate HTTP <-> DTOs; Express 5 forwards rejected promises to the error handler, so no try/catch is needed here

const getAll = async (req, res) => {
    const users = await userService.getAll();
    res.status(200).json(users);
}

const getById = async (req, res) => {
    const user = await userService.getById(req.params.id);
    res.status(200).json(user);
}

const create = async (req, res) => {
    const user = await userService.create(UserRequestDto.fromRequest(req.body));
    res.status(201).json(user);
}

const update = async (req, res) => {
    const user = await userService.update(req.params.id, UserRequestDto.fromRequest(req.body));
    res.status(200).json(user);
}

const remove = async (req, res) => {
    await userService.remove(req.params.id);
    res.status(204).end();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
