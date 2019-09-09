# http-rest-decorator


[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![NPM version](https://badge.fury.io/js/http-rest-decorator.svg)](http://badge.fury.io/js/http-rest-decorator)

****
This library allows to interact with rest api in your angular app.

### Features
- Http methods: GET, POST, PUT, DELETE, HEAD;
- Async or sync request;
- Use of a mockup to emulate working with a webApi server;
- Use adapters to transform response data received from the webApi or to prepare data to be sent to the server
- Flexible configuration for setting

### Changelog
&nbsp;&nbsp;&nbsp;&nbsp;Check out the <a href="https://github.com/alexey-gladilin/http-rest-decorator/blob/master/CHANGELOG.MD" rel="nofollow">changelog</a> to check all the latest changes.

### List of decorators
*Class level*

- BaseUrl - *(webApi url host)*
- DefaultHeaders - *(default request header for each method HttpService)*

*Methods level*
- GET, POST, POST_SYNC, PUT, DELETE, HEAD - *(request method)*
- Headers - *(request header)*
- Produces - *(determines what type of data the method can send)*
- Adapter - *(functions to be called for data transformation)*
- Mockup - *(mockup data generation)*

*Parameters level*
- Path - *(variables are passed in url)*
- Query - *(parameter values to determine the type of serialization of the contents of the request/response MIME type 'application/x-www-form-urlencoded')*
- Body - *(body REST method)*

### Installation

```sh
npm install http-rest-decorator
```

### Usage


#### Configuration

You can configure services to work with the Web Api in several ways


**WebApi services must be declared in the module in the "providers" section instead (@Injectable({
  providedIn: 'root'
}) otherwise it will not work)*


1. default configuration for all services (in *.module.ts)

```typescript
import {
  HTTP_CONFIG,
  HttpConfig
} from 'http-rest-decorator';

/**
 * default http service configuration settings
 */
export const DEFAULT_HTTP_CONFIG: HttpConfig = {
  Url: 'api.heroes.com',
  Headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'DataType': 'application/json'
  }
};

/**
 * main module application
 */
@NgModule({
  ...
  providers: [
    { provide: HTTP_CONFIG, useValue: DEFAULT_HTTP_CONFIG },
    HeroWebApi
  ]
  ...
})
export class AppModule { }

```

2. Individual service configuration

```typescript
/**
 * http service of communication with webApi in the context of heroes
 */
@Injectable()
@BaseUrl('http://mysite.com/api/hero')
@DefaultHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})
export class HeroWebApi extends HttpService {
}
````

**DefaultHeader decorator optional*

#### An example of declaring methods to access the webApi

```typescript
  /**
   * returns a list of heroes.
   * test data is used.
   * if you remove the decorator Mockup, the call will be made
   * to web Api via http Protocol
   */
  @GET()
  @Mockup(HeroMockup.getHeroes)
  getHeroes(): Observable<Hero[]> { return null; }

  /**
   * returns the hero
   * @param id the ID of the hero
   */
  @GET('{id}')
  getHero(@Path('id') id: number): Observable<Hero> { return null; }

  /**
   * saves the data of the hero
   * @param request data to update
   */
  @POST()
  updateHero(@Body('request') request: Hero): Observable<Hero> { return null; }
```

### Example of using a data transformation adapter

```typescript
@GET()
@Adapter({
  response: [{
    fn: HeroAdapter.getHeroesTransform
  }]
})
getHeroes(): Observable<Hero[]> { return null; }
```
Data transformation methods can be called both after receiving data from the web Api and before sending it to the server.
