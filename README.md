# fetched
A window.fetch wrapper with an ajax/superagent like API


## About
`fetched` provides a thin-wrapper around the `window.fetch` api to allow
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

```js
import Fetched from 'Fetched';

let agent = new Fetched('http://example.com');

agent.post('/api/login')
    .send({
        username: 'my-username',
        password: 'my-password'
    })
    .json()
    .withCredentials()
    .end()
```
