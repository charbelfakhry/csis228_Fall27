const productService = require("../service/productService");

const getAll = async (req, res, next) =>{
    try{
        const products = await productService.getAll();
        res.status(200).json(products);
    }catch(error){
        next(error);
    }
}

const getById = async (req, res, next) => {
    try{
        const id = req.params.id;
        const product = await productService.getById(id);
        res.status(200).json(product);
    }catch(error){
        next(error);
    }
}

const create = async (req, res, next) =>{
    try{
        const {name, description, quantity} = req.body;
        const result = await productService.create({name, description, quantity});
        res.status(201).json(result);
    }catch(error){
        next(error);
    }
}

const update = async (req, res, next) =>{
    try{
        const id = req.params.id;
        const {name, description, quantity} = req.body;
        const result = await productService.update(id, {name, description, quantity});
        res.status(200).json(result);
    }catch(error){
        next(error);
    }
}

const remove = async (req, res, next) =>{
    try{
        const id = req.params.id;
        const deleted = await productService.remove(id);
        res.status(200).json(deleted);
    }catch(error){
        next(error);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
