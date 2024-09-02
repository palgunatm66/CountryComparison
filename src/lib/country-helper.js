'use strict';

const axios = require('axios');

exports.getCountries = async function getCountries() {
  try {
    const response = await axios.get('https://d6wn6bmjj722w.population.io:443/1.0/countries');
    console.log(response.data); // Add this line to log the response
    return response.data.countries;
  } catch (error) {
    console.error('Error fetching countries:', error.message); // Add this line to log the error
    throw new Error('Error fetching countries: ' + error.message);
  }
};

exports.getPopulation = async function getPopulation(country, date) {
  try {
    const url = `https://d6wn6bmjj722w.population.io:443/1.0/population/${country}/${date}`;
    const response = await axios.get(url);
    return response.data.total_population.population;
  } catch (error) {
    console.error(`Error fetching population for ${country}:`, error.message);
    throw new Error(`Error fetching population for ${country}: ` + error.message);
  }
};
