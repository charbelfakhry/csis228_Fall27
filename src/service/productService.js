const productRepository = require("../repository/productRepository");
const {NotFoundError} = require("../errors/AppError");
const {ProductResponseDto} = require("../dto/ProductDto");

// business rules live here; "not found" is decided once instead of in every controller
// services take request DTOs and return response DTOs, so models never leave this layer
const getAll = async () => {
    const products = await productRepository.getAll();
    return ProductResponseDto.fromModels(products);
}

const getById = async (id) => {
    const product = await productRepository.getById(id);
    if(!product){
        throw new NotFoundError(`Product ${id} not found`);
    }
    return ProductResponseDto.fromModel(product);
}

const create = async (productDto) => {
    const product = await productRepository.create(productDto);
    return ProductResponseDto.fromModel(product);
}

const update = async (id, productDto) => {
    const updated = await productRepository.update(id, productDto);
    if(!updated){
        throw new NotFoundError(`Product ${id} not found`);
    }
    return ProductResponseDto.fromModel(updated);
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
