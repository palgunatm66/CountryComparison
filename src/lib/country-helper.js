'use strict';

const axios = require('axios');

exports.getCountries = async function getCountries() {
  try {
    const response = await axios.get('https://d6wn6bmjj722w.population.io:443/1.0/countries');
    return response.data.countries;
  } catch (error) {
    throw new Error('Error fetching countries: ' + error.message);
  }
};

exports.getPopulation = async function getPopulation(country, date) {
  try {
    const url = `https://d6wn6bmjj722w.population.io:443/1.0/population/${country}/${date}`;
    const response = await axios.get(url);
    return response.data.total_population.population;
  } catch (error) {
    throw new Error(`Error fetching population for ${country}: ` + error.message);
  }
};
