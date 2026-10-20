const userService = require("../service/userService");

// Express 5 forwards rejected promises to the error handler, so no try/catch is needed here

const getAll = async (req, res) => {
    const users = await userService.getAll();
    res.status(200).json(users);
}

const getById = async (req, res) => {
    const user = await userService.getById(req.params.id);
    res.status(200).json(user);
}

const create = async (req, res) => {
    const {firstName, lastName, dob} = req.body;
    const user = await userService.create({firstName, lastName, dob});
    res.status(201).json(user);
}

const update = async (req, res) => {
    const {firstName, lastName, dob} = req.body;
    const user = await userService.update(req.params.id, {firstName, lastName, dob});
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
