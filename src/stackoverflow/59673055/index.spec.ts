import { SomeClass } from '.';
import * as someModule from './someModule';

fdescribe('59673055', () => {
  beforeEach(function() {
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });
  it('should pass', async () => {
    const mock2: jasmine.Spy = spyOn(someModule, 'foo');
    const instance = new SomeClass();
    return instance.myFunc().then(() => {
      jasmine.clock().tick(10);
      expect(mock2).toHaveBeenCalledTimes(1);
    });
  });
});
