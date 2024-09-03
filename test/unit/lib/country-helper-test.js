const sinon = require('sinon');
const chai = require('chai');
const axios = require('axios');
const countryHelper = require('../../../src/lib/country-helper');

chai.should();

describe('countryHelper', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getCountries', () => {
    it('should return a list of countries', async () => {
      const mockResponse = { data: { countries: ['Brazil', 'Argentina'] } };
      sandbox.stub(axios, 'get').resolves(mockResponse);

      const countries = await countryHelper.getCountries();
      countries.should.eql(['Brazil', 'Argentina']);
    });

    it('should throw an error if fetching countries fails', async () => {
      const error = new Error('Network Error');
      sandbox.stub(axios, 'get').rejects(error);

      try {
        await countryHelper.getCountries();
      } catch (err) {
        err.message.should.equal('Error fetching countries: Network Error');
      }
    });
  });

  describe('getPopulation', () => {
    it('should return the population for a given country and date', async () => {
      const mockResponse = { data: { total_population: { population: 123456 } } };
      sandbox.stub(axios, 'get').resolves(mockResponse);

      const population = await countryHelper.getPopulation('Brazil', '2024-09-03');
      population.should.equal(123456);
    });

    it('should throw an error if fetching population fails', async () => {
      const error = new Error('Network Error');
      sandbox.stub(axios, 'get').rejects(error);

      try {
        await countryHelper.getPopulation('Brazil', '2024-09-03');
      } catch (err) {
        err.message.should.equal('Error fetching population for Brazil: Network Error');
      }
    });
  });
});
