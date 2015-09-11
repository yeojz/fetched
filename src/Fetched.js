/**
 *
 *  Fetched
 *  A WHATWG fetch API wrapper inspired by superagent style api.
 *
 *  @class Fetched
 *  @since 0.1.0
 *  @author Gerald Yeo
 *  @license MIT
 *
 */
class Fetched {

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
     */
    init() {
        this.baseUri = this.baseUri || '';
        this.options = this.options || {};
        this.options.headers = this.options.headers || {};
        this.isJson = false;


        return this;
    }


    /**
     *  Resets the all options
     */
    reset() {
        this.options = {
            headers: {},
            method: 'get'
        }

        this.isJson = false;
        return this;
    }


    /**
     * Sets the base uri for endpoint
     *
     *  @param {string} base - the base url for your endpoints
     */
    uri(base = '') {
        this.baseUri = base;
        return this;
    }


    /**
     *  Generic method setting method
     *  In case there are any other HTTP methods.
     *
     *  @param {string} name
     */
    method(name) {
        this.init();
        this.options.method = name;
        return this;
    }


    /**
     *  Post Method
     *
     *  @param {string} endpoint
     */
    post(endpoint) {
        this.init();
        this.options.method = 'post';
        this.endpoint = endpoint;
        return this;
    }


    /**
     *  Post Method
     *
     *  @param {string} endpoint
     */
    get(endpoint) {
        this.init();
        this.options.method = 'get';
        this.endpoint = endpoint;
        return this;
    }


    /**
     *  Post Method
     *
     *  @param {string} endpoint
     */
    delete(endpoint) {
        this.init();
        this.options.method = 'delete';
        this.endpoint = endpoint;
        return this;
    }


    /**
     *  Post Method
     *
     *  @param {string} endpoint
     */
    put(endpoint) {
        this.init();
        this.options.method = 'put';
        this.endpoint = endpoint;
        return this;
    }


    /**
     *  Post Method
     *
     *  @param {string} endpoint
     */
    set(key, value){
        this.options.headers[key] = value;
        return this;
    }


    /**
     *  Sets return and sending content to json
     *
     *  @param {boolean} value
     */
    json(value = true) {
        this.options.headers['Accept'] = 'application/json';
        this.options.headers['Content-Type'] = 'application/json';
        this.isJson = value;

        return this;
    }


    /**
     *  By default, fetch does not send Cookies.
     *  This will enable or disable cookies.
     *
     *  @param {Object} type
     */
    withCredentials(type = 'include') {
        this.options.credentials = type;
        return this;
    }


    /**
     *  Sets the data to send
     *
     *  @param {Object} data
     */
    send(data) {
        this.data = data;
        return this;
    }


    /**
     *  Overrides all the configurations
     */
    config(opt = {}) {
        let options = {
            ...this.options,
            ...opt
        }

        this.options = opt;

        return this;
    }


    /**
     *  Executes the promise call
     */
    end() {
        let params = {
            ...this.options,
        };

        if (this.data){
            params.body = (this.isJson) ? JSON.stringify(this.data) : this.data;
        }

        return fetch(this.baseUri + this.endpoint, params);
    }
}

export default Fetched;
