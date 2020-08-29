import { assert } from 'chai';
import { apiHelper } from 'js-utils-apm';
import * as sinon from 'sinon';

import SomeClass from '../../src/api-helper-examples/some-class';

describe('SomeClass', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getDataFromApi', () => {
    it('sets results when api request succeeds', () => {
       const someClass = new SomeClass();
       const someData = ['hello'];

       sandbox.stub(apiHelper, 'get').resolves(someData);

       // Assert that it is not loading
       assert.equal(someClass.isLoading, false);

       // Get the promise and do not chain on it yet
       const getDataFromApiPromise = someClass.getDataFromApi();

       // Assert it is loading
       assert(someClass.isLoading);

       return getDataFromApiPromise.then(() => {
           assert.deepEqual(someClass.results, someData);
           assert.equal(someClass.error, null);
           assert.equal(someClass.isLoading, false);
       });
    });

    it('sets error when api request fails', () => {
       const someClass = new SomeClass();
       const someError = new Error('this is an error');

       sandbox.stub(apiHelper, 'get').rejects(someError);

       // Assert that it is not loading
       assert.equal(someClass.isLoading, false);

       // Get the promise and do not chain on it yet
       const getDataFromApiPromise = someClass.getDataFromApi();

       // Assert it is loading
       assert(someClass.isLoading);

       return getDataFromApiPromise.then(() => {
           assert.deepEqual(someClass.results, []);
           assert.equal(someClass.error, someError);
           assert.equal(someClass.isLoading, false);
       });
    });
  });
});