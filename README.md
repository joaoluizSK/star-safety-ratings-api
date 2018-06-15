# Star Safety Ratings API

## Introduction

This is a short coding assignment, in which I implemented an API in Node.js that calls a "backend API" to get information about crash test ratings for vehicles.

The underlying API that is to be used here is the [NHTSA NCAP 5 Star Safety Ratings API](https://one.nhtsa.gov/webapi/Default.aspx?SafetyRatings/API/5).  This requires no sign up / authentication on your part, and you are not required to study it.  The exact calls that you need to use are provided in this document.


## Installing

Clone the project, then running:

``npm install``

``npm start``

## API Documentation

After running `npm start` you can access the API Documentation using the link: 

``http://localhost:8888/api-docs/``

## How to Test

To execute the tests, you can running `npm test`.
To create the tests I used this npm packages:
 - <a href="https://mochajs.org">Mocha</a> - Used to create the application tests.
 - <a href="http://chaijs.com/">Chai</a> - Used to assertions and test the endpoints at Vehicle API.
 - <a href="https://github.com/nock/nock">Nock</a> - Used to mock the NHTSA NCAP 5 Star Safety Ratings API responses.

## Mainly packages

Another packages used during the development this application:
 - <a href="http://expressjs.com">Express</a> - Used to create the endpoints for the Vehicle API.
 - <a href="https://www.npmjs.com/package/express-validation">Express-validation</a> - Used to validate the body and params of a request according to the rules defined.
 - <a href="https://www.npmjs.com/package/joi">Joi</a> - Used to create schemas to validate the body anda params.
 - <a href="https://www.npmjs.com/package/swagger-ui-express">Swagger-ui-express</a> - Used to serve the Swagger documentation.
 
I chose this packages because its are used frequently for the community and they attend very well my needs.
