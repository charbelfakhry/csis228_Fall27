const productService = require("../service/productService");
const {ProductRequestDto} = require("../dto/ProductDto");

// same services as the API controller; only the response differs (render instead of json)
// Express 5 forwards rejected promises, so a NotFoundError from the service reaches the error handler

// forms send "" for an empty textarea, while the API sends nothing; store both as NULL
const toDto = (body) => ProductRequestDto.fromRequest({...body, description: body.description || null});

const list = async (req, res) => {
    const products = await productService.getAll();
    res.render("products/index", {title: "Products", products});
}

const show = async (req, res) => {
    const product = await productService.getById(req.params.id);
    res.render("products/show", {title: product.name, product});
}

const newForm = (req, res) => {
    res.render("products/form", {title: "New product", action: "/products", values: {}, errors: {}});
}

// every successful POST redirects (Post/Redirect/Get) so a refresh does not re-submit the form
const create = async (req, res) => {
    const product = await productService.create(toDto(req.body));
    res.redirect(`/products/${product.id}`);
}

const editForm = async (req, res) => {
    const product = await productService.getById(req.params.id);
    res.render("products/form", {
        title: `Edit ${product.name}`,
        action: `/products/${product.id}/edit`,
        values: product,
        errors: {}
    });
}

const update = async (req, res) => {
    await productService.update(req.params.id, toDto(req.body));
    res.redirect(`/products/${req.params.id}`);
}

const remove = async (req, res) => {
    await productService.remove(req.params.id);
    res.redirect("/products");
}

module.exports = {
    list,
    show,
    newForm,
    create,
    editForm,
    update,
    remove
}
