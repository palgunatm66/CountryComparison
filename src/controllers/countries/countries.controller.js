'use strict';

const errors = require('restify-errors');
const countryHelper = require('../../lib/country-helper');

exports.getCountries = async function getCountries(req, res) {
  try {
    const countries = await countryHelper.getCountries();
    res.json(countries);
  } catch (err) {
    res.send(new errors.InternalServerError(err, 'Server error retrieving countries.'));
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
    const populationData = await Promise.all(countryList.map(async (country) => {
      const population = await countryHelper.getPopulation(country, date);
      return { country, population };
    }));

    if (sortOrder) {
      populationData.sort((countryA, countryB) =>
        sortOrder === 'asc' ?
          countryA.population - countryB.population :
          countryB.population - countryA.population
      );
    }

    res.json(populationData);
    return res; // Ensure the function returns a value
  } catch (err) {
    res.send(new errors.InternalServerError(err, 'Server error retrieving population data.'));
    return res; // Ensure the function returns a value
  }
};
