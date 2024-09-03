'use strict';

const controller = require('./countries.controller');
function routes(app, rootUrl) {
  // include api version number
  let fullRootUrl = rootUrl + '/v1';

  /**
    * @apiVersion 1.0.0
    * @api {get} /countries Get list of all countries
    * @apiGroup Countries
    * @apiName GetCountries
    * @apiDescription Returns an array of country names
    *
    * @apiSampleRequest http://localhost:3000/api/v1/countries
    *
    * @apiSuccess {Object} response Response object
    * @apiSuccess {String[]} response.countries Array of all country names
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 200 OK
    *   [
    *     "Afghanistan",
    *     "AFRICA",
    *     "Albania",
    *     ...
    *   ]
    *
    * @apiError (500) InternalServerError Returned if there was a server error
    * @apiError (404) NotFoundError Returned if there was a server error
    * @apiErrorExample {json} Error-Response:
    *   HTTP/1.1 500 Internal Server Error
    *   {
    *     "error": "InternalServerError",
    *     "message": "An unexpected error occurred."
    *   }
    *
    * @apiExample {curl} Example usage:
    *   curl -i http://localhost:3000/api/v1/countries
    */
  app.get({ url: fullRootUrl + '/countries' }, controller.getCountries);

  /**
    * @apiVersion 1.0.0
    * @api {get} /api/v1/population-comparison/:countries/:sortOrder? Get population comparison
    * @apiGroup Population
    * @apiName GetPopulationComparison
    * @apiDescription Returns a list of countries and their population based on the current date
    *
    * @apiSampleRequest http://localhost:3000/api/v1/population-comparison/:countries/:sortOrder?
    *
    * @apiParam {String} countries Comma-separated list of country names
    * @apiParam {String="asc","desc"} [sortOrder] Optional sort order (asc or desc)
    *
    * @apiSuccess {Object[]} populationData Array of countries and their population
    * @apiSuccess {String} populationData.country Country name
    * @apiSuccess {Number} populationData.population Population of the country
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 200 OK
    *   [
    *     { "country": "Brazil", "population": 210147125 },
    *     { "country": "Argentina", "population": 44271041 },
    *     ...
    *   ]
    *
    * @apiError (400) BadRequestError Returned if the countries parameter is missing
    * @apiError (404) NotFoundError Returned if the countries parameter is not found
    * @apiErrorExample {json} Error-Response:
    *   HTTP/1.1 400 Bad Request
    *   {
    *     "error": "BadRequestError",
    *     "message": "The 'countries' parameter is required."
    *   }
    *
    * @apiError (500) InternalServerError Returned if there was a server error
    * @apiErrorExample {json} Error-Response:
    *   HTTP/1.1 500 Internal Server Error
    *   {
    *     "error": "InternalServerError",
    *     "message": "An unexpected error occurred."
    *   }
    *
    * @apiExample {curl} Example usage:
    *   curl -i http://localhost:3000/api/v1/population-comparison/Brazil,Argentina/asc
    */
  app.get(
    { url: fullRootUrl + '/population-comparison/:countries/:sortOrder?' },
    controller.getPopulationComparison
  );
}

module.exports = {
  routes: routes
};
