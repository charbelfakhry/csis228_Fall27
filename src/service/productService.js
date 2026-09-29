const productRepository = require("../repository/productRepository");

const getAll = () => {
    return productRepository.getAll();
}

const getById = (id) =>{
    return productRepository.getById(id);
}

const create = (product) =>{
    return productRepository.create(product);
}

const update = (id, product) =>{
    return productRepository.update(id, product);
}

const remove = (id) =>{
    return productRepository.remove(id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}