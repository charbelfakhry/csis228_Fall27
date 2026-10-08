const {AppError, NotFoundError} = require("../errors/AppError");

const PG_ERRORS = {
    "23505": [409, "CONFLICT", "Resource already exists"],
    "22P02": [400, "INVALID_INPUT", "Invalid input syntax"],
    "22007": [400, "INVALID_INPUT", "Invalid date format"],
    "22008": [400, "INVALID_INPUT", "Date value out of range"],
    "22003": [400, "INVALID_INPUT", "Numeric value out of range"],
    "22001": [400, "INVALID_INPUT", "Value too long for field"]
}

const DB_UNAVAILABLE = ["ECONNREFUSED", "ENOTFOUND", "ETIMEDOUT", "57P01", "3D000", "28P01"];

// convert any error to AppError
const normalizeError = (err) =>{
    if(err instanceof AppError){
        return err;
    }

    if(err.type === "entity.parse.failed"){
        return new AppError("Malformed JSON in request body", 400, "INVALID_JSON");
    }

    if(err.type === "entity.too.large"){
        return new AppError("Request body too large", 413, "PAYLOAD_TOO_LARGE");
    }

    if(PG_ERRORS[err.code]){
        const [statusCode, code, message] = PG_ERRORS[err.code];
        return new AppError(message, statusCode, code, err.detail);
    }

    if(DB_UNAVAILABLE.includes(err.code)){
        return new AppError("Database unavailable", 503, "DB_UNAVAILABLE");
    }

    return new AppError("Internal server error");
}

// catches requests that did not match any route
const notFoundHandler = (req, res, next) =>{
    next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
}

// must have 4 params so express treats it as an error handler
const errorHandler = (err, req, res, next) =>{
    if(res.headersSent){
        return next(err);
    }

    const error = normalizeError(err);

    if(error.statusCode >= 500){
        console.error(err);
    }

    res.status(error.statusCode).json({
        error: {
            code: error.code,
            message: error.message,
            details: error.details
        }
    });
}

module.exports = {
    notFoundHandler,
    errorHandler
}
