'use strict';

const errors = require('restify-errors');
const countryHelper = require('../../lib/country-helper');

exports.getCountries = async function getCountries(req, res) {
  try {
    const countries = await countryHelper.getCountries();
    if (!countries || countries.length === 0) {
      return res.send(new errors.NotFoundError('No countries found.'));
    }
    res.json(countries);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      res.send(new errors.NotFoundError('Countries data not found.'));
    } else {
      res.send(new errors.InternalServerError(err, 'Server error retrieving countries.'));
    }
  }
};

exports.getPopulationComparison = async function getPopulationComparison(req, res) {
  try {
    const { countries, sortOrder } = req.params;
    const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    if (!countries) {
      return res.send(new errors.BadRequestError('Countries parameter is required.'));
    }

    const countryList = countries.split(',');
    if (countryList.length === 0) {
      return res.send(new errors.BadRequestError('At least one country must be specified.'));
    }

    const populationData = await Promise.all(countryList.map(async (country) => {
      const population = await countryHelper.getPopulation(country, date);
      return { country, population };
    }));

    if (sortOrder) {
      if (!['asc', 'desc'].includes(sortOrder)) {
        return res.send(new errors.BadRequestError('Invalid sortOrder parameter. Use "asc" or "desc".'));
      }
      populationData.sort((countryA, countryB) =>
        sortOrder === 'asc' ?
          countryA.population - countryB.population :
          countryB.population - countryA.population
      );
    }

    res.json(populationData);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      res.send(new errors.NotFoundError('Population data not found.'));
    } else if (err.message.includes('Network Error')) {
      res.send(new errors.ServiceUnavailableError('External API is unavailable.'));
    } else {
      res.send(new errors.InternalServerError(err, 'Server error retrieving population data.'));
    }
  }
};
