# crawl-it requirements

 * as an application it should be broken down to scalable components.
 * as an application it should handle an API request that triggers a crawl-worker job for specified url.
   * the request MUST be made using POST methodto `parse` endpoint and contain 'url' property in it's body.
 * as an application it should store parsed url contetnt and sublinks in persistent database.
   * for sake of demonstarating the case we use redis to store it all, thou it can be refactored to be used with any non sql backed solution.
