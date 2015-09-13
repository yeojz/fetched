
import {expect} from 'chai';
import Fetched from '../../src/Fetched';


describe('Fetched API Tests', () => {

    let fetched;
    let reqlib = (url, param) => [url, param];

    let testBaseUri = 'http://localhost';
    let sampleQueryUrl = 'http://localhost/test?ah=three&oh=two&um=one&yeah=four';
    let sampleData = {
        um: 'one',
        oh: 'two',
        ah: 'three',
        yeah: 'four'
    }


    beforeEach(() => {
        fetched = new Fetched(testBaseUri);
    });


    it('check existence of API methods', () => {

        let methods = [
            'post',
            'get',
            'del',
            'put',
            'set',
            'send',
            'json',
            'withCredentials',
            'format',
            'using',
            'accept',
            'type'
        ];

        methods.forEach((key) => {
            try {
                expect(fetched[key]).to.be.an('function');
            } catch(err){
                throw new Error(err + ' (method: ' + key + ')');
            }
        });
    });


    it('correct base endpoint', () => {
        expect(fetched.baseUri).to.equal(testBaseUri);
    })


    it('check request methods', () => {
        let check;

        check = fetched.get('/uri');
        expect(check.options.method).to.equal('get');

        check = fetched.post('/uri');
        expect(check.options.method).to.equal('post');

        check = fetched.del('/uri');
        expect(check.options.method).to.equal('delete');

        check = fetched.put('/uri');
        expect(check.options.method).to.equal('put');

        check = fetched.method('NewMethod', '/uri');
        expect(check.options.method).to.equal('newmethod');
    });


    it('should return resource as query string', () => {

        let check = fetched.get('/test')
            .send(sampleData)
            .format();

        expect(check.resource).to.equal(sampleQueryUrl);
    });


    it('calling json would set proper headers and format', () => {
        let check = fetched.post('/test')
            .send(sampleData)
            .json()
            .withCredentials()
            .format();

        expect(check.params.headers.Accept).to.equal('application/json');
        expect(check.params.headers['Content-Type']).to.equal('application/json');
        expect(check.params.body).to.equal(JSON.stringify(sampleData));
    });


    it('method `type` should accept arbitrary `Content-Type` and predefined shorthands', () => {
        let check;

        check = fetched.type('json');
        expect(check.options.headers['Content-Type']).to.equal('application/json');

        check = fetched.type('fetching/new-type')
        expect(check.options.headers['Content-Type']).to.equal('fetching/new-type');

    });


    it('method `accept` should accept arbitrary `Accept` and predefined shorthands', () => {
        let check;

        check = fetched.accept('json');
        expect(check.options.headers.Accept).to.equal('application/json');

        check = fetched.accept('fetching/new-type')
        expect(check.options.headers.Accept).to.equal('fetching/new-type');

    });
});


