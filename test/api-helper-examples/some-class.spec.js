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
       let res;
       let rej;
       const myPromise = new Promise((resolve, reject) => {
           res = resolve;
           rej = reject;
       });

       sandbox.stub(apiHelper, 'get').returns(myPromise);

       // Assert that it is not loading
       assert.equal(someClass.isLoading, false);

       // Get the promise and do not chain on it yet
       const getDataFromApiPromise = someClass.getDataFromApi();

       // Assert it is loading
       assert(someClass.isLoading);

       // Now we resolve the promise so it can execute the .then chain
       res(someData);

       return getDataFromApiPromise.then(() => {
           assert.deepEqual(someClass.results, someData);
           assert.equal(someClass.error, null);
           assert.equal(someClass.isLoading, false);
       });
    });

    it('sets error when api request fails', () => {
       const someClass = new SomeClass();
       const someError = new Error('this is an error');
       let res;
       let rej;
       const myPromise = new Promise((resolve, reject) => {
           res = resolve;
           rej = reject;
       });

       sandbox.stub(apiHelper, 'get').returns(myPromise);

       // Assert that it is not loading
       assert.equal(someClass.isLoading, false);

       // Get the promise and do not chain on it yet
       const getDataFromApiPromise = someClass.getDataFromApi();

       // Assert it is loading
       assert(someClass.isLoading);

       // Now we reject the promise so it can execute .then chain
       rej(someError);

       return getDataFromApiPromise.then(() => {
           assert.deepEqual(someClass.results, []);
           assert.equal(someClass.error, someError);
           assert.equal(someClass.isLoading, false);
       });
    });
  });
});