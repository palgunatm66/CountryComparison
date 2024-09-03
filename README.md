<img src="atom.png"  width="200" height="60">

## Country Comparison API

### What is this?

The Country Comparison API will use data from a 3rd party provider, [api.population.io](http://api.population.io)<sup>[1](#footnote1)</sup>, to provide comparisons on population statistics.  Your colleague Joe Coder started the implementation (in Node.js v10 using restify), and now it's your turn to bring it to the next level.  

Our current stack is primarily built in Node.js, Golang, and .NET.  Since this service is just getting off the ground, if you'd rather implement this in a different language, feel free to do so.

### Setup

1. Download the repo
2. Run `npm install` to install dependencies
3. Run `npm test` to run unit tests
4. Set your NODE_ENV to `dev`
5. Run `npm start` to start the server
6. Alternatively, you can use Docker to run the application:
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

    * To improve performance, consider caching the results of API calls to the 3rd party provider. This can reduce the number of external requests and speed up response times. Additionally, optimizing database queries and using efficient data structures can help improve performance. For example, in the `getPopulationComparison` function, we could implement a caching mechanism using Redis to store the population data for a short period. This would reduce the number of calls to the external API and improve the response time for frequent requests. 

  * Suppose we expect this API to be hit 1000s of times a second.  How can we handle the load?
    * To handle high load, consider implementing load balancing, horizontal scaling, and using a distributed caching system like Redis. Additionally, optimizing the code and api requests can help improve performance under high load.

  * What if the 3rd party provider is not available?  How resilient is our API?
    * To improve resilience, implement a fallback mechanism that returns cached data or a default response when the 3rd party provider is unavailable. Additionally, consider using a circuit breaker pattern to prevent cascading failures.

  * What if the requirement for the new endpoint was to also allow the consumer to compare populations for any given date.  How would you modify your implementation?
    * Modify the `getPopulationComparison` function to accept an optional `date` parameter. If the `date` parameter is provided, use it to fetch population data for the specified date. If not, use the current date.

  * What if we have a database of users and we wanted to make our API smarter by defaulting comparisons to always include the population of the current user's country.  How could we accomplish this?
    * Implement user authentication and store user information in a database. Modify the `getPopulationComparison` function to include the current user's country in the comparison if the user is authenticated.
    
  * What if we wanted to keep a tally of the most frequently requested countries and have this be available to consumers.  How could we accomplish this?
    * Implement a logging mechanism to track the frequency of country requests. Store this data in a database and create an endpoint that returns the most frequently requested countries.

2. Dockerize the API

<br>
<i><a name="footnote1"><sup>1</sup></a> Joe says that api.population.io is down, so try https://d6wn6bmjj722w.population.io/ as the host instead.<i>
