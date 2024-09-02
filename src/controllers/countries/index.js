'use strict';

const controller = require('./countries.controller');

function routes(app, rootUrl) {
  // include api version number
  let fullRootUrl = rootUrl + '/v1';

  /**
    * @apiVersion 1.0.0
    * @api {get} /countries
    * @apiGroup Countries
    * @apiName Get list of all countries
    * @apiDescription Returns an array of country names
    *
    * @apiSampleRequest /api/v1/countries
    *
    * @apiSuccess {json} Array of all country names
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 200 OK
    *   [
    *     "Afghanistan",
    *     "AFRICA",
    *     "Albania",
    *     ...
    *   ]
    *
    * @apiError (Error 500) InternalServerError Returned if there was a server error
    */
  app.get({ url: fullRootUrl + '/countries' }, controller.getCountries);

  /**
    * @apiVersion 1.0.0
    * @api {get} /population-comparison
    * @apiGroup Population
    * @apiName Get population comparison
    * @apiDescription Returns a list of countries and their population based on the current date
    *
    * @apiSampleRequest /api/v1/population-comparison
    *
    * @apiParam {String} countries Comma-separated list of country names
    * @apiParam {String} [sortOrder] Optional sort order (asc or desc)
    *
    * @apiSuccess {json} Array of countries and their population
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 200 OK
    *   [
    *     { "country": "Brazil", "population": 210147125 },
    *     { "country": "Argentina", "population": 44271041 },
    *     ...
    *   ]
    *
    * @apiError (Error 500) InternalServerError Returned if there was a server error
    */
  app.get({ url: fullRootUrl + '/population-comparison' }, controller.getPopulationComparison);
}

module.exports = {
  routes: routes
};
