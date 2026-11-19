const {validationResult} = require("express-validator");
const validate = require("./validate");

// like validate.js, but re-renders the form with messages and the user's input instead of forwarding a JSON error
// getLocals(req) supplies the view's other variables (title, form action)
const validateForm = (view, getLocals) => (req, res, next) =>{
    const result = validationResult(req);

    if(result.isEmpty()){
        return next();
    }

    const errors = result.array({onlyFirstError: true});

    // a bad :id is not something the user can fix in the form, so show the normal error page
    if(errors.some((err) => err.location !== "body")){
        return validate(req, res, next);
    }

    // sanitizers already ran on req.body (e.g. toInt turns "abc" into NaN);
    // for invalid fields, show the value exactly as the user typed it
    const values = {...req.body};
    const fieldErrors = {};
    for(const err of errors){
        values[err.path] = err.value;
        fieldErrors[err.path] = err;
    }

    res.status(400).render(view, {
        ...getLocals(req),
        values,
        errors: fieldErrors
    });
}

module.exports = validateForm;
