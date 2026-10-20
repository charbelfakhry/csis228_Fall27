const productRepository = require("../repository/productRepository");
const {NotFoundError} = require("../errors/AppError");

// business rules live here; "not found" is decided once instead of in every controller
const getAll = () => {
    return productRepository.getAll();
}

const getById = async (id) => {
    const product = await productRepository.getById(id);
    if(!product){
        throw new NotFoundError(`Product ${id} not found`);
    }
    return product;
}

const create = (product) => {
    return productRepository.create(product);
}

const update = async (id, product) => {
    const updated = await productRepository.update(id, product);
    if(!updated){
        throw new NotFoundError(`Product ${id} not found`);
    }
    return updated;
}

const remove = async (id) => {
    const deleted = await productRepository.remove(id);
    if(!deleted){
        throw new NotFoundError(`Product ${id} not found`);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
