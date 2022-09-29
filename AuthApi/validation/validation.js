const Joi = require('@hapi/joi');

//register validaiton
const registerValidation = (data) => {
    const signSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return signSchema.validate(data)
};

//login validation
const loginValidation = (data) => {
    const logSchema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return logSchema.validate(data)
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;