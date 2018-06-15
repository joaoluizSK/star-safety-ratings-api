const Joi = require('joi')

module.exports = {

    // GET /vehicles/:modelyear/:manufacturer/:model
    modelyear: {
        params: {
            modelyear: Joi.number().required()
        }
    },
    manufacturer: {
        params: {
            manufacturer: Joi.string().required()
        }
    },
    model: {
        params: {
            model: Joi.string().required()
        }
    },

    //Post /vehicles
    bodyValidator: {
        body: {
            modelYear: Joi.number().required(),
            manufacturer: Joi.string().required(),
            model: Joi.string().required()
        }
    }
}