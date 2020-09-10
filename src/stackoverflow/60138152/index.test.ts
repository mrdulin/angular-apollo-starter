import * as AWS from 'aws-sdk';

describe('60138152', () => {
  it('should pass', async () => {
    const ssmMock = {
      getParameter: jasmine.createSpy().and.callFake(function(msg) {
        return this;
      }),
      promise: jasmine.createSpy().and.returnValue(Promise.resolve('mock data')),
    };
    spyOn(AWS, 'SSM').and.callFake(() => ssmMock as any);
    const mod = require('./');
    console.log(mod.main);
  });
});
