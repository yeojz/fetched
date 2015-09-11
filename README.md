# fetched
A window.fetch/node-fetch wrapper with an ajax/superagent like API

[![npm](https://img.shields.io/npm/v/fetched.svg?style=flat-square)](https://www.npmjs.com/package/fetched)

## About
`fetched` provides a thin-wrapper around the `fetch` api to allow
for a more declarative use.

This library requires `fetch` and `promise` to work.


## Installation

`npm install fetched --save`

You may need the following polyfills:

__fetch__
`npm install whatwg-fetch --save`

__promise__
`npm install es6-promise  --save`



## Usage

For example, posting data to `http://example.com/api/me`

```js
import Fetched from 'fetched';

let agent = new Fetched(fetch);
agent.provider('http://example.com');


agent.post('/api/me')
    .send({
        username: 'my-username',
        password: 'my-password'
    })
    .json()
    .withCredentials()
    .end()
```
