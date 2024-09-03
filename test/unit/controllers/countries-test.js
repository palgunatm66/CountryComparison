const app = require('../../../src/server.js');
const config = require('../../../src/config');
const request = require('supertest');
const sinon = require('sinon');
require('chai').should();

const countryHelper = require('../../../src/lib/country-helper');

describe('countries endpoint tests', () => {
  let sandbox;
  beforeEach(function beforeEach() {
    sandbox = sinon.createSandbox();
  });

  afterEach(function afterEach() {
    sandbox.restore();
  });

  describe('get countries', function getCountries() {
    const endpointUrl = config.routes.controllerRootUrl + '/v1/countries';

    it('should return a list of countries', function handleGettingCountries(done) {
      sandbox.stub(countryHelper, 'getCountries').returns(['Brazil', 'Argentina']);

      request(app)
        .get(`${endpointUrl}`)
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.should.eql(['Brazil', 'Argentina']);
          return done();
        });
    });

    it('should return empty array if no countries found', function handleNoCountriesFound(done) {
      sandbox.stub(countryHelper, 'getCountries').returns([]);

      request(app)
        .get(`${endpointUrl}`)
        .set('accept', 'application/json')
        .expect(200, [])
        .end((err) => {
          if (err) {
            return done(err);
          }
          return done();
        });
    });

    it('should return 500 if error getting countries', function handleErrorGettingCountries(done) {
      const error = new Error('Failed to fetch countries from the database');
      sandbox.stub(countryHelper, 'getCountries').throws(error);

      request(app)
        .get(`${endpointUrl}`)
        .set('accept', 'application/json')
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.have.property('message');
          res.body.message.should.include('Failed to fetch countries from the database');
          return done();
        });
    });
  });

  describe('get population comparison', function getPopulationComparison() {
    const endpointUrl = config.routes.controllerRootUrl + '/v1/population-comparison';

    it('should return population data for specified countries', function handlePopulationComparison(done) {
      const mockPopulationData = [
        { country: 'Brazil', population: 210147125 },
        { country: 'Argentina', population: 44271041 },
      ];

      sandbox.stub(countryHelper, 'getPopulation').callsFake((country) => {
        const data = mockPopulationData.find(
          (item) => item.country === country
        );
        return data ? data.population : 0;
      });

      request(app)
        .get(`${endpointUrl}/Brazil,Argentina`)
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.should.eql(mockPopulationData);
          return done();
        });
    });

    it('should return sorted population data if sortOrder is specified', function handleSortedPopulationComparison(done) {
      const mockPopulationData = [
        { country: 'Brazil', population: 210147125 },
        { country: 'Argentina', population: 44271041 },
      ];

      sandbox.stub(countryHelper, 'getPopulation').callsFake((country) => {
        const data = mockPopulationData.find(
          (item) => item.country === country
        );
        return data ? data.population : 0;
      });

      request(app)
        .get(`${endpointUrl}/Brazil,Argentina/desc`)
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.should.eql(
            mockPopulationData.sort((a, b) => b.population - a.population)
          );
          return done();
        });
    });

    it('should return 400 if countries parameter is missing', function handleMissingCountriesParameter(done) {
      request(app)
        .get(`${endpointUrl}//asc`)
        .set('accept', 'application/json')
        .expect(400)
        .end((err) => {
          if (err) {
            return done(err);
          }
          return done();
        });
    });

    it('should return 500 if error getting population data', function handleErrorGettingPopulationData(done) {
      const error = new Error('fake error');
      sandbox.stub(countryHelper, 'getPopulation').throws(error);
      request(app)
        .get(`${endpointUrl}/Brazil,Argentina`)
        .set('accept', 'application/json')
        .expect(500)
        .end((err) => {
          if (err) {
            return done(err);
          }
          return done();
        });
    });
  });
});

