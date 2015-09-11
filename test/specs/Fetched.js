
import assert from 'assert';
import Fetched from '../../src/Fetched';

let fetched;

let fetch = function(url, param){
    return [
        url,
        param
    ]
}

describe('Fetched API tests', () => {


    beforeEach(() => {
        fetched = new Fetched(fetch);
    });


    afterEach(() => {
        fetched = '';
    });


    it('Testing for methods', () => {

        let methods = [
            'post',
            'get',
            'delete',
            'put',
            'set',
            'send',
            'json',
            'withCredentials',
            'end'
        ];

        methods.forEach((key) => {
            assert.equal(typeof fetched[key], 'function');
        });
    });

});

