import querystring from 'query-string';
import config from './config';

/**
 *
 *  Fetched
 *
 *  A XHR request formatter with an ajax/superagent like API
 *  that is targeted toward `window.fetch` whatwg standard / polyfill
 *
 *  @class Fetched
 *  @since 0.1.0
 *  @author Gerald Yeo
 *  @license MIT
 *
 */
export default class Fetched {

    /**
     *  Creates the instance
     *
     *  @param {string} base - the base url for your endpoints
     */
    constructor(base = '') {
        this.init();
        this.baseUri = base;
    }


    /**
     *  Initialization
     *
     *  @return {Fetched}
     */
    init() {
        this.baseUri = this.baseUri || '';
        this.data = this.data || {};
        this.options = {
            headers: {},
            method: 'get',
            ...this.options,
        }

        return this;
    }


    /**
     *  Resets the all options
     *
     *  @return {Fetched}
     */
    reset() {
        this.options = {
            headers: {},
            method: 'get'
        }
        this.data = {};

        return this;
    }


//  Building Methods
//  ----------------------------------------------

    /**
     * Sets the base uri for endpoint
     *
     *  @param {string} base - the base url for your endpoints
     *  @return {Fetched}
     */
    provider(base = '') {
        this.baseUri = base;

        return this;
    }


    /**
     *  Generic method setting method
     *  In case there are any other HTTP methods.
     *
     *  @param {string} name
     *  @param {string} endpoint
     *  @return {Fetched}
     */
    method(name, endpoint) {
        this.init();
        this.options.method = name.toLowerCase();
        this.endpoint = endpoint;

        return this;
    }


    /**
     *  Post Method
     *
     *  @param {string} endpoint
     *  @return {Fetched}
     */
    post(endpoint) {
        this.init();
        this.options.method = 'post';
        this.endpoint = endpoint;

        return this;
    }


    /**
     *  Get Method
     *
     *  @param {string} endpoint
     *  @return {Fetched}
     */
    get(endpoint) {
        this.init();
        this.options.method = 'get';
        this.endpoint = endpoint;

        return this;
    }


    /**
     *  Delete Method
     *
     *  @param {string} endpoint
     *  @return {Fetched}
     */
    del(endpoint) {
        this.init();
        this.options.method = 'delete';
        this.endpoint = endpoint;

        return this;
    }


    /**
     *  Post Method
     *
     *  @param {string} endpoint
     *  @return {Fetched}
     */
    put(endpoint) {
        this.init();
        this.options.method = 'put';
        this.endpoint = endpoint;

        return this;
    }


    /**
     *  Header setting method
     *
     *  @param {string|object} key
     *  @param {string} value
     *  @return {Fetched}
     */
    set(key, value = null){

        // If it's a object
        // Iterate and set all associated values
        if (typeof key === 'object') {
            Object.keys(key).forEach((k) => {
                this.options.headers[k] = key[k];
            });

        } else {
            this.options.headers[key] = value;
        }

        return this;
    }


    /**
     *  Sets return and sending content to json
     *
     *  @param {boolean} value
     *  @return {Fetched}
     */
    json(value = true) {
        this.options.headers['Accept'] = 'application/json';
        this.options.headers['Content-Type'] = 'application/json';
        this.isJson = value;

        return this;
    }


    /**
     *  Accept headers
     *
     *  @param {string} value
     *  @return {Fetched}
     */
    accept(value) {
        this.options.headers['Accept'] = config.types[value] || value;

        return this;
    }


    /**
     *  Content Type headers
     *
     *  @param {string} value
     *  @return {Fetched}
     */
    type(value) {
        this.options.headers['Content-Type'] = config.types[value] || value;

        return this;
    }


    /**
     *  By default, fetch does not send Cookies.
     *  This will enable or disable cookies.
     *
     *  @param {Object} value
     *  @return {Fetched}
     */
    withCredentials(value = 'include') {
        this.options.credentials = value;

        return this;
    }


    /**
     *  Sets the data to send
     *
     *  @param {string|Object} key
     *  @param {string} value
     *  @return {Fetched}
     */
    send(key, value) {
        if (typeof key === 'object') {
            let data = {
                ...this.data,
                ...key
            }

            this.data = data;

        } else {
            this.data[key] = value;
        }

        return this;
    }


    /**
     *  Overrides all the configurations
     *
     *  @return {Fetched}
     */
    config(opt = {}) {
        let options = {
            ...this.options,
            ...opt
        }

        this.options = opt;

        return this;
    }


//  Formmatting and Exit methods
//  ----------------------------------------------

    /**
     *  Check if data should be sent as a string
     *  or as part of a request body.
     *
     *  @return {Fetched}
     */
    isQueryString() {
        if (this.options.headers['Content-Type'] === 'application/x-www-form-urlencoded'){
            return true;
        }

        if (this.options.method === 'get'){
            return true;
        }

        return false;
    }


    /**
     *  Formats data using predfined formatters
     *  depending on the data type
     *
     *  @return {string}
     */
    formatData(data) {
        let type = this.options.headers['Content-Type'];

        if (this.options.method === 'get') {
            type = 'query';
        }

        let map =  {
            'application/json': JSON.stringify,
            'application/x-www-form-urlencoded': querystring.stringify,
            'query': querystring.stringify
        }

        let formatter = map[type];

        return (formatter) ? formatter(data) : data;
    }


    /**
     *  Gets a formatted request object
     *  without for further parsing outside this class
     *
     *  @return {Object}
     */
    format() {
        let data;
        let resource = this.baseUri + this.endpoint;

        let params = {
            ...this.options,
        };

        if (Object.keys(this.data).length > 0){
            data= this.formatData(this.data);

            if (this.isQueryString()){
                resource += '?' + data;
            } else {
                params.body = data;
            }
        }

        return {
            resource: resource,
            params: params
        }
    }


    /**
     *  Executes request using the provided transport instance
     *
     *  @param {Object} req - the transport instance (eg: fetch)
     */
    using(req) {
        const {resource, params} = this.format();

        return req(resource, params);
    }
}

