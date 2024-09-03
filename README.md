<img src="atom.png"  width="200" height="60">

## Country Comparison API

### What is this?

The Country Comparison API will use data from a 3rd party provider, [api.population.io](http://api.population.io)<sup>[1](#footnote1)</sup>, to provide comparisons on population statistics.  Your colleague Joe Coder started the implementation (in Node.js v10 using restify), and now it's your turn to bring it to the next level.  

Our current stack is primarily built in Node.js, Golang, and .NET.  Since this service is just getting off the ground, if you'd rather implement this in a different language, feel free to do so.

### Setup

1. Download the repo
2. Ensure you are using Node.js version 20 or higher for local runs. You can check your Node.js version with:
   ```sh
   node -v
   ```
   If you need to upgrade, you can download the latest version from [nodejs.org](https://nodejs.org/).
3. Run `npm install` to install dependencies
4. Run `npm test` to run unit tests
5. Set your NODE_ENV to `dev`
6. Run `npm start` to start the server
7. Alternatively, you can use Docker to run the application:
   - Pull the Docker image: `docker pull palgunatm66/population-comparision:1.0`
   - Run the Docker container: `docker run -p 3000:3000 palgunatm66/population-comparision:1.0`

### Requirements

Joe created one endpoint that retrieves a list of country names, using mock data.

1. Update the endpoint to pull country data from http://api.population.io/1.0/countries.
2. The endpoint http://api.population.io/1.0/population/:country/:date returns the total population for a given country on a given date.  Design and implement an endpoint in our API that will allow a consumer to specify an arbitrary set of countries and an optional sort order, and receive back a list of countries and their population based on the current date.  If a sort order was specified, return the list sorted on population size, according to the consumer's requested sort order.

Try to be consistent with Joe's implementation in terms of:
* unit tests
* documentation
* error handling
* response codes
* validation
* etc.

Zip your solution, upload it somewhere, and send us a link to the zipped file.

### Bonus
1. Some scenarios to consider (leave your thoughts inline in your code or edit the README):
  * How efficient is your code?  What are some ways that you could improve performance?
    * The current codebase is reasonably efficient but has room for improvement. The `getPopulationComparison` function fetches population data for each country sequentially, which can be slow if the list of countries is long. Additionally, there is no caching mechanism in place, which means repeated requests for the same data will always hit the external API, leading to potential performance bottlenecks.

    * To improve performance, consider caching the results of API calls to the 3rd party provider. This can reduce the number of external requests and speed up response times. Additionally, optimizing api queries  can help improve performance. For example, in the `getPopulationComparison` function, we could implement a caching mechanism using Redis to store the population data for a short period. This would reduce the number of calls to the external API and improve the response time for frequent requests. 

    ```javascript:src/controllers/countries/countries.controller.js
    startLine: 15
    endLine: 43
    ```

  * Suppose we expect this API to be hit 1000s of times a second.  How can we handle the load?
    * To handle high load, consider implementing load balancing, horizontal scaling, and using a distributed caching system like Redis. Additionally, optimizing the code and API requests can help improve performance under high load. Using a cloud provider with auto-scaling capabilities can also help manage the load effectively.

    ```javascript:src/server.js
    startLine: 1
    endLine: 61
    ```

  * What if the 3rd party provider is not available?  How resilient is our API?
    * To improve resilience, implement a fallback mechanism that returns cached data or a default response when the 3rd party provider is unavailable. Additionally, consider using a circuit breaker pattern to prevent cascading failures. This can be achieved by using libraries like `opossum` in Node.js.

    ```javascript:src/lib/country-helper.js
    startLine: 1
    endLine: 22
    ```

  * What if the requirement for the new endpoint was to also allow the consumer to compare populations for any given date.  How would you modify your implementation?
    * Modify the `getPopulationComparison` function to accept an optional `date` parameter. If the `date` parameter is provided, use it to fetch population data for the specified date. If not, use the current date. This can be done by adding an additional query parameter to the endpoint and updating the logic to handle this parameter.

    ```javascript:src/controllers/countries/countries.controller.js
    startLine: 15
    endLine: 43
    ```

  * What if we have a database of users and we wanted to make our API smarter by defaulting comparisons to always include the population of the current user's country.  How could we accomplish this?
    * Implement user authentication and store user information in a database. Modify the `getPopulationComparison` function to include the current user's country in the comparison if the user is authenticated. This can be achieved by using JWT tokens for authentication and querying the user's country from the database.

    ```javascript:src/controllers/countries/index.js
    startLine: 1
    endLine: 93
    ```

  * What if we wanted to keep a tally of the most frequently requested countries and have this be available to consumers.  How could we accomplish this?
    * Implement a logging mechanism to track the frequency of country requests. Store this data in a database and create an endpoint that returns the most frequently requested countries. This can be done by incrementing a counter in the database each time a country is requested and querying the top requested countries for the new endpoint.

    ```javascript:test/unit/controllers/countries-test.js
    startLine: 1
    endLine: 160
    ```

2. Dockerize the API


## Country Comparison API

The Country Comparison API provides endpoints to retrieve and compare population statistics of various countries using data from a third-party provider. This API is built using Node.js and Restify.

### Features

- Retrieve a list of country names.

- Compare population data for a specified set of countries.

- Optional sorting of population data based on size.


### How to Run

You can run the Country Comparison API using Docker. Follow the steps below to get started:

1. **Pull the Docker Image:**
   docker pull palgunatm66/population-comparision:1.0

2. **Run the Docker Container:**
   docker run -p 3000:3000 palgunatm66/population-comparision:1.0


### Endpoints

- **Get List of Countries:**

  - **URL:** `/api/v1/countries`

  - **Method:** `GET`

  - **Description:** Returns an array of country names.

- **Get Population Comparison:**

  - **URL:** `/api/v1/population-comparison/:countries/:sortOrder?`

  - **Method:** `GET`

  - **Description:** Returns population data for the specified countries. Optionally, the data can be sorted in ascending (`asc`) or descending (`desc`) order.

### Example Usage

- **Get List of Countries:**

  ```sh
  curl -i http://localhost:3000/api/v1/countries
  ```

- **Get Population Comparison:**

  ```sh
  curl -i http://localhost:3000/api/v1/population-comparison/Brazil,Argentina/desc
  ```

### Notes

- Ensure your `NODE_ENV` is set to `production` when running the Docker container.
- The API uses data from `https://d6wn6bmjj722w.population.io`.

For more details, refer to the [README](https://github.com/KaplanTestPrep/country-comparison-api/blob/main/README.md) on GitHub.

<br>
<i><a name="footnote1"><sup>1</sup></a> Joe says that api.population.io is down, so try https://d6wn6bmjj722w.population.io/ as the host instead.<i>
