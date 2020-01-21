const closures = require('./closures');

fdescribe('Closure', () => {
  let closure;
  const hello = () => console.log('hello');

  beforeEach(() => {
    closure = new closures();
  });

  describe('after', () => {
    beforeEach(() => {
      spyOn(console, 'log');
    });

    it('executes callback after called first x times', () => {
      const runOnce = closure.after(1, hello);
      const first = runOnce();
      expect(first).toEqual(undefined);
      expect(console.log).toHaveBeenCalledWith('hello');
      expect(console.log.calls.count()).toEqual(1);
    });
    it('should not call calback if counter is not equal with r', () => {
      const runOnce = closure.after(2, hello);
      const first = runOnce();
      expect(first).toEqual(undefined);
      expect(console.log).not.toHaveBeenCalled();
    });
  });
});
