class AppError extends Error{
    constructor(message, statusCode = 500, code = "INTERNAL_ERROR", details){
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        Error.captureStackTrace(this, this.constructor)
    }
}

class BadRequestError extends AppError{
    constructor(message = "Bad Request", details){
        super(message, 400, "BAD_REQUEST", details);
    }
}

class ValidationError extends AppError{
    constructor(details, message = "Validation failed"){
        super(message, 400, "VALIDATION_ERROR", details);
    }
}

class NotFoundError extends AppError{
    constructor(message = "Resource not Found"){
        super(message, 404, "NOT_FOUND")
    }
}

class ConflictError extends AppError{
    constructor(message = "Resource conflict"){
        super(message, 409, "CONFLICT")
    }
}

module.exports = {
    AppError,
    BadRequestError,
    ValidationError,
    NotFoundError,
    ConflictError
}