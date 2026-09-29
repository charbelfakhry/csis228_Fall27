const productService = require("../service/productService");

const getAll = async (req, res) =>{
    const products = await productService.getAll();
    res.status(200).json(products);
}

const getById = async (req, res) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).json({message: "Missing Data!"});
    }
    const product = await productService.getById(id);
    res.status(200).json(product);
}

const create = async (req, res) =>{
    const {name, description, quantity} = req.body;
    if(!name || !description || !quantity){
        return res.status(400).json({message: "Missing Data!"});
    }
    const result = await productService.create({name, description, quantity});
    res.status(201).json(result);
}

const update = async (req, res) =>{
    const id = req.params.id;
    const {name, description, quantity} = req.body;
    if(!id || !name || !description || !quantity){
        return res.status(400).json({message: "Missing Data!"});
    }
    const result = await productService.update(id, {name, description, quantity});
    res.status(200).json(result);
}

const remove = async (req, res) =>{
    const id = req.params.id;
    if(!id){
        return res.status(400).json({message: "Missing Data!"});
    }
    const deleted = await productService.remove(id);
    res.status(200).json(deleted);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}