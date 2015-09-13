# fetched
`fetched` is a xhr request formatter with an ajax/superagent inspired API
that is targeted toward `window.fetch` WHATWG standard / polyfill

[![npm](https://img.shields.io/npm/v/fetched.svg?style=flat-square)](https://www.npmjs.com/package/fetched)
[![Build Status](https://img.shields.io/travis/yeojz/fetched.svg?style=flat-square)](https://travis-ci.org/yeojz/fetched)

## About
`fetched` provides a declarative wrapper for request parameters.
It's targeted towards `window.fetch` standard, but can be used to format
request object for other XMLHttpRequest libraries


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
    .using(fetch)
```

To use with other libraries, you can do the following:
```
agent.post('/api/me')
    .send({
        username: 'my-username',
        password: 'my-password'
    })
    .json()
    .withCredentials()
    .format();
```
You should get the following output:
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
