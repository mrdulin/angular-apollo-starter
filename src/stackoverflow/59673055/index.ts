import * as someModule from './someModule';

export class SomeClass {
  public async myFunc() {
    setImmediate(() => {
      someModule.foo();
    }, 0);
  }
}
