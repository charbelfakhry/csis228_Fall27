const userService = require("../service/userService");
const {UserRequestDto} = require("../dto/UserDto");

// same pattern as productViewController.js: reuse the service, render pages, redirect after every successful POST

const list = async (req, res) => {
    const users = await userService.getAll();
    res.render("users/index", {title: "Users", users});
}

const show = async (req, res) => {
    const user = await userService.getById(req.params.id);
    res.render("users/show", {title: `${user.firstName} ${user.lastName}`, user});
}

const newForm = (req, res) => {
    res.render("users/form", {title: "New user", action: "/users", values: {}, errors: {}});
}

const create = async (req, res) => {
    const user = await userService.create(UserRequestDto.fromRequest(req.body));
    res.redirect(`/users/${user.id}`);
}

const editForm = async (req, res) => {
    const user = await userService.getById(req.params.id);
    res.render("users/form", {
        title: `Edit ${user.firstName} ${user.lastName}`,
        action: `/users/${user.id}/edit`,
        values: user,
        errors: {}
    });
}

const update = async (req, res) => {
    await userService.update(req.params.id, UserRequestDto.fromRequest(req.body));
    res.redirect(`/users/${req.params.id}`);
}

const remove = async (req, res) => {
    await userService.remove(req.params.id);
    res.redirect("/users");
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
