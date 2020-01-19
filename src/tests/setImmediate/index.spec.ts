import { main } from './';
import * as mod from './mod';

xdescribe('setImmediate', () => {
  beforeEach(function() {
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });
  it('should pass', () => {
    const fooSpy: jasmine.Spy = spyOn(mod, 'foo').and.stub();
    main();
    jasmine.clock().tick(10);
    expect(fooSpy).toHaveBeenCalledTimes(1);
  });
});
