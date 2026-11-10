const User = require("../models/User");

const getAll = () => {
    return User.findAll({order: [["id", "ASC"]]});
}

const getById = (id) => {
    return User.findByPk(id);
}

const create = (userDto) => {
    return User.create({...userDto});
}

const update = async (id, userDto) => {
    const [count, rows] = await User.update({...userDto}, {where: {id}, returning: true});
    return count > 0 ? rows[0] : null;
}

const remove = async (id) => {
    const count = await User.destroy({where: {id}});
    return count > 0;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
