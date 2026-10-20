const Product = require("../models/Product");

const getAll = () => {
    return Product.findAll({order: [["id", "ASC"]]});
}

const getById = (id) => {
    return Product.findByPk(id);
}

const create = (product) => {
    return Product.create(product);
}

const update = async (id, product) => {
    const [count, rows] = await Product.update(product, {where: {id}, returning: true});
    return count > 0 ? rows[0] : null;
}

const remove = async (id) => {
    const count = await Product.destroy({where: {id}});
    return count > 0;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
