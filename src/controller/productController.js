const productService = require("../service/productService");

// Express 5 forwards rejected promises to the error handler, so no try/catch is needed here

const getAll = async (req, res) => {
    const products = await productService.getAll();
    res.status(200).json(products);
}

const getById = async (req, res) => {
    const product = await productService.getById(req.params.id);
    res.status(200).json(product);
}

const create = async (req, res) => {
    const {name, description, quantity} = req.body;
    const product = await productService.create({name, description, quantity});
    res.status(201).json(product);
}

const update = async (req, res) => {
    const {name, description, quantity} = req.body;
    const product = await productService.update(req.params.id, {name, description, quantity});
    res.status(200).json(product);
}

const remove = async (req, res) => {
    await productService.remove(req.params.id);
    res.status(204).end();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
