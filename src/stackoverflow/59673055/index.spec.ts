import { SomeClass } from '.';
import * as someModule from './someModule';

xdescribe('59673055', () => {
  beforeEach(function() {
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });
  it('should pass', async () => {
    const fooMock: jasmine.Spy = spyOn(someModule, 'foo').and.stub();
    const instance = new SomeClass();
    await instance.myFunc();
    jasmine.clock().tick(10);
    expect(fooMock).toHaveBeenCalledTimes(1);
  });
});
