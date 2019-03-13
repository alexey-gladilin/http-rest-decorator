# http-rest-decorator


[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This library allows to interact with rest api in your angular app.

### Feature
- Http methods: GET, POST, PUT, DELETE, HEAD;
- Async or sync request;
- Use of a mockup to emulate working with a webApi server;
- Use adapters to transform response data received from the webApi or to prepare data to be sent to the server
- Flexible configuration for setting

### List of decorators

- BaseUrl
- DefaultHeaders
- GET, POST, POST_SYNC, PUT, DELETE, HEAD
- Headers
- Produces
- Adapter
- Mockup
- Path
- Query
- Body

### Installation

```sh
npm install http-rest-decorator
```

### Usage


#### Configuration

You can configure services to work with the Web Api in several ways

1. default configuration for all services

in *.module.ts
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
  providers: [{ provide: HTTP_CONFIG, useValue: DEFAULT_HTTP_CONFIG }]
  ...
})
export class AppModule { }

```

2.


```typescript
  /* returns a list of heroes.
   * test data is used.
   * if you remove the decorator Mockup, the call will be made
   * to web Api via http Protocol
   */
  @GET()
  @Mockup(HeroMockup.getHeroes)
  getHeroes(): Observable<Hero[]> { return null; }
```

