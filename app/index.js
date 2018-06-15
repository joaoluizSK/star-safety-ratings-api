const express = require("express")
const bodyParser = require("body-parser")
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../api-info/swagger.json');

var app = express()

app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", require('./vehicles/router'))

app.use(function (err, req, res, next) {
    res.json({"Count": 0, "Results": []})
});

module.exports = app