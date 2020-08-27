/* eslint-env mocha */

import { expect } from 'chai';
import sinon from 'sinon';

const somethingAsync = () => Promise.all([1]);

describe('dangerous examples', () => {
  it('expects stuff inside .then()', () => {
    somethingAsync().then(() => {
      expect(true).to.be.false('');
    });
  });

  it('expects stuff inside .callsFake()', async () => {
    const nestedStub = sinon.stub();

    const underTest = () => {
      return nestedStub()
        .then(() => console.log('No return value'))
        .catch(console.warn);
    };

    nestedStub.callsFake(async () => {
      expect(true).to.be.false('');
      return 'anything';
    });

    await underTest();
  });
});
