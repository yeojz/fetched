# fetched

[![npm](https://img.shields.io/npm/v/fetched.svg?style=flat-square)](https://www.npmjs.com/package/fetched)
[![Build Status](https://img.shields.io/travis/yeojz/fetched.svg?style=flat-square)](https://travis-ci.org/yeojz/fetched)

`fetched` provides a declarative wrapper for request parameters.
It's targeted towards `window.fetch` standard, but can be used to format
request object for other XMLHttpRequest libraries

In general, `fetched` is a xhr request formatter with an ajax/superagent inspired API
that is targeted toward `window.fetch` WHATWG standard / polyfill.


## Installation

`npm install fetched --save`

To use `fetch`, You may need the following polyfills:

__fetch__
`npm install whatwg-fetch --save`

__promise__
`npm install es6-promise  --save`



## Usage

For example, posting data to `http://example.com/api/me`

```js
import Fetched from 'fetched';

let agent = new Fetched('http://localhost');

agent.post('/api/me')
    .send({
        username: 'my-username',
        password: 'my-password'
    })
    .json()
    .withCredentials()
    .using(fetch); // uses window.fetch object. Can be other compatible HTTP request libraries.
```
The above will return a fetch promise object.


To use with other libraries, you can do the following:
```
let result = agent.post('/api/me')
    .send({
        username: 'my-username',
        password: 'my-password'
    })
    .json()
    .withCredentials()
    .format();
```
You should get the following output in your `result` variable:
```json
{
    "resource": "http://localhost",
    "params": {
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        "method": "post",
        "body": "{'username':'my-username','password':'my-password'}",
        "credentials": "include"
    }
}
```

## Note:

API is still a little unstable.
