const closures = require('./closures');

describe('Closure', () => {
  let closure;
  let runOnce;
  const hello = () => console.log('hello');

  beforeEach(() => {
    closure = new closures();
  });

  describe('after', () => {
    beforeEach(() => {
      spyOn(console, 'log');
      runOnce = closure.after(1, hello);
    });

    it('executes callback after called first x times', () => {
      const first = runOnce();
      expect(first).toEqual(undefined);
      expect(console.log).toHaveBeenCalledWith('hello');
      expect(console.log.calls.count()).toEqual(1);
    });
  });
});
