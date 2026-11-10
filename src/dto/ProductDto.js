// DTO = Data Transfer Object: a plain object that defines exactly what crosses a layer boundary.
// - the request DTO is what the API accepts (built from req.body in the controller)
// - the response DTO is what the API returns (built from the Sequelize model in the service)
// This keeps unknown body fields (e.g. "id") out of the database and keeps ORM internals out of responses.

class ProductRequestDto{
    constructor({name, description, quantity}){
        this.name = name;
        // PUT replaces the whole product, so a missing description must clear it (undefined would keep the old value)
        this.description = description ?? null;
        this.quantity = quantity;
    }

    static fromRequest(body){
        return new ProductRequestDto(body);
    }
}

class ProductResponseDto{
    constructor(product){
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.quantity = product.quantity;
    }

    static fromModel(product){
        return new ProductResponseDto(product);
    }

    static fromModels(products){
        return products.map(ProductResponseDto.fromModel);
    }
}

module.exports = {
    ProductRequestDto,
    ProductResponseDto
}
