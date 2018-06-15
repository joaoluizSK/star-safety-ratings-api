process.env.NODE_ENV = 'test';

const nock = require('nock')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app/index');
const assert = chai.assert
chai.use(chaiHttp)

const response = {
    Count: 4,
    Message: "Results returned successfully",
    Results: [
        {
            VehicleDescription: "2015 Audi A3 4 DR AWD",
            VehicleId: 9403
        },
        {
            VehicleDescription: "2015 Audi A3 4 DR FWD",
            VehicleId: 9408
        },
        {
            VehicleDescription: "2015 Audi A3 C AWD",
            VehicleId: 9405
        },
        {
            VehicleDescription: "2015 Audi A3 C FWD",
            VehicleId: 9406
        }
    ]
};

describe('Vehicle routes', function () {

    beforeEach(function () {

        //GET MODELS
        nock("https://one.nhtsa.gov")
            .get("/webapi/api/SafetyRatings/modelyear/2015/make/Audi/model/A3?format=json")
            .reply(200, response)

        // OVERALL RATING
        nock("https://one.nhtsa.gov")
            .get("/webapi/api/SafetyRatings/VehicleId/9403?format=json")
            .reply(200, {
                Results: [
                    {
                        "OverallRating": "Not Rated"
                    }
                ]
            })

        nock("https://one.nhtsa.gov")
            .get("/webapi/api/SafetyRatings/VehicleId/9408?format=json")
            .reply(200, {
                Results: [
                    {
                        "OverallRating": "2"
                    }
                ]
            })

        nock("https://one.nhtsa.gov")
            .get("/webapi/api/SafetyRatings/VehicleId/9405?format=json")
            .reply(200, {
                Results: [
                    {
                        "OverallRating": "4"
                    }
                ]
            })

        nock("https://one.nhtsa.gov")
            .get("/webapi/api/SafetyRatings/VehicleId/9406?format=json")
            .reply(200, {
                Results: [
                    {
                        "OverallRating": "1"
                    }
                ]
            })
    });

    describe('GET /vehicles/:modelyear/:manufacturer/:model', function () {
        it('should return 4 on the count variable', function (done) {
            chai.request(server)
                .get("/vehicles/2015/Audi/A3")
                .end((err, res) => {
                    assert.equal(res.body.Count, 4)
                    done();
                })
        });

        it('should return 0 on the count variable because de param :modelyear is undefined', function (done) {
            chai.request(server)
                .get("/vehicles/undefined/Audi/A3")
                .end((err, res) => {
                    assert.equal(res.body.Count, 0)
                    done();
                })
        });

    });

    describe('GET /vehicles/:modelyear/:manufacturer/:model?withRating=true', function () {
        it('should return the element CrashRating on the array', function (done) {
            chai.request(server)
                .get("/vehicles/2015/Audi/A3?withRating=true")
                .end((err, res) => {
                    assert.property(res.body.Results[0], 'CrashRating')
                    done();
                })
        });

        it('should not return the element CrashRating on the array because the parameter withRating is invalid', function (done) {
            chai.request(server)
                .get("/vehicles/2015/Audi/A3?withRating=bananas")
                .end((err, res) => {
                    assert.notProperty(res.body.Results[0], 'CrashRating')
                    done();
                })
        });
    });

    describe('POST /vehicles', function () {
        it('should return 4 on the count variable', function (done) {
            chai.request(server)
                .post("/vehicles")
                .send({
                    "modelYear": 2015,
                    "manufacturer": "Audi",
                    "model": "A3"
                })
                .end((err, res) => {
                    assert.equal(res.body.Count, 4)
                    done();
                })
        });

        it('should return 0 on the count variable because the modelyear is missing', function (done) {
            chai.request(server)
                .post("/vehicles")
                .send({
                    "manufacturer": "Audi",
                    "model": "A3"
                })
                .end((err, res) => {
                    assert.equal(res.body.Count, 0)
                    done();
                })
        });
    });
});