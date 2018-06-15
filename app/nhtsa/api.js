const https = require('https')

/**
 * This function make the request on API and retrieve information about the vehicles
 * @param req
 * @param res
 */
function getInformationAboutVehicle(modelyear, manufacturer, model) {
    return new Promise(function (resolve) {
        https.get(`https://one.nhtsa.gov/webapi/api/SafetyRatings/modelyear/${modelyear}/make/${manufacturer}/model/${model}?format=json`,
            function (response) {
                response.on('data', function (data) {
                        resolve(data)
                    }
                )
            })
    })
}

/**
 * This function return the OverallRating acessing the public NHTSA NCAP 5 Star Safety Ratings API
 * @param vehicleId
 * @returns {Promise}
 */
function getOverallRating(vehicleId) {
    return new Promise(function (resolve, reject) {
        https.get(`https://one.nhtsa.gov/webapi/api/SafetyRatings/VehicleId/${vehicleId}?format=json`,
            function (response) {
                response.on('data', function (data) {
                    const {Results} = JSON.parse(data)
                    resolve(Results[0].OverallRating)
                })
            })
    })
}

module.exports = {
    getInformationAboutVehicle: getInformationAboutVehicle,
    getOverallRating: getOverallRating
}