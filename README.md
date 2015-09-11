# fetched
`fetched` is a xhr request formatter with an ajax/superagent like API
that is targeted toward `window.fetch` WHATWG standard / polyfill

[![npm](https://img.shields.io/npm/v/fetched.svg?style=flat-square)](https://www.npmjs.com/package/fetched)


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

let agent = new Fetched('http://example.com');


agent.post('/api/me')
    .send({
        username: 'my-username',
        password: 'my-password'
    })
    .json()
    .withCredentials()
    .using(fetch)
```

## Note:

API will not be stable until version 1.0.0
