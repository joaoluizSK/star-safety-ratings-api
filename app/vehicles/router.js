const router = require('express').Router()
const validate = require('express-validation')
const validator = require('./validation/vehicles-validator')
const api = require('../nhtsa/api')

/**
 * This function make the request on API and retrieve the data to show for users
 * @param req
 * @param res
 */
function getVehiclesModelsUsingUrlParams(req, res) {
    api.getInformationAboutVehicle(req.params.modelyear, req.params.manufacturer, req.params.model)
        .then(data => {
            makeResponse(isResultWithRating(req), data)
                .then(response => {
                    res.json(response)
                })
        })
}

/**
 * This function make the request on API and retrieve the data to show for users
 * @param req
 * @param res
 */
function getVehiclesModelsUsingBodyParams(req, res) {
    api.getInformationAboutVehicle(req.body.modelYear, req.body.manufacturer, req.body.model)
        .then(data => {
            const {Count, Results} = JSON.parse(data);
            let resultAux = [];

            Results.forEach(vehicle => {
                const {VehicleDescription, VehicleId} = vehicle
                resultAux.push({
                    VehicleId,
                    "Description": VehicleDescription
                })
            })
            res.json({Count, "Results": resultAux})
        })
}

/**
 * This function is responsible to create a response object
 * @param isResultWithRating
 * @param data
 * @returns {Promise}
 */
function makeResponse(isResultWithRating, data) {
    return new Promise(function (resolve) {
        const {Count, Results} = JSON.parse(data);
        let resultAux = [];

        if (isResultWithRating) {
            let promises = [];

            Results.forEach(vehicle => {
                promises.push(api.getOverallRating(vehicle.VehicleId))
            })

            Promise.all(promises).then(rates => {
                Results.forEach((vehicle, index) => {
                    const {VehicleDescription, VehicleId} = vehicle
                    resultAux.push({
                        "CrashRating": rates[index],
                        VehicleId,
                        "Description": VehicleDescription
                    })
                })
                resolve({Count, "Results": resultAux})
            })
        } else {
            Results.forEach(vehicle => {
                const {VehicleDescription, VehicleId} = vehicle
                resultAux.push({
                    VehicleId,
                    "Description": VehicleDescription
                })
            })

            resolve({Count, "Results": resultAux})
        }

    })
}

/**
 * Function that verify if the Result must have the CrashRating
 * @param req
 * @returns {boolean}
 */
function isResultWithRating(req) {
    return req.query.withRating === 'true';
}

/**
 * GET /vehicles/:modelyear/:manufacturer/:model - Get list of models
 */
router.route('/vehicles/:modelyear/:manufacturer/:model')
    .get(getVehiclesModelsUsingUrlParams)

/**
 * POST /vehicles - Get list of models
 */
router.post('/vehicles', validate(validator.bodyValidator), getVehiclesModelsUsingBodyParams)

/**
 * Param validation
 */
router.param('modelyear', validate(validator.modelyear))
router.param('manufacturer', validate(validator.manufacturer))
router.param('model', validate(validator.model))

module.exports = router