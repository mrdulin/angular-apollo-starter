import { MyService } from './service';

describe('63819030', () => {
  it('should pass', () => {
    const myFunctionSpy = spyOn(MyService.prototype, 'myFunction').and.stub();
    const service = new MyService();
    expect(myFunctionSpy).toHaveBeenCalledTimes(1);
  });
});
