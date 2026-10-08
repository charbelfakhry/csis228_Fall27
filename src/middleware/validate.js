const {validationResult} = require("express-validator");
const {ValidationError} = require("../errors/AppError");

// runs after the validation chains and forwards any failures to the error handler
const validate = (req, res, next) =>{
    const result = validationResult(req);

    if(!result.isEmpty()){
        const details = result.array({onlyFirstError: true}).map((err) => ({
            field: err.path,
            message: err.msg
        }));
        return next(new ValidationError(details));
    }

    next();
}

module.exports = validate;
