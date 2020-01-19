import * as mod from './mod';

// https://stackoverflow.com/questions/59823585/jasmine-seems-doesnt-support-mock-the-clock-for-setimmediate
export function main() {
  setImmediate(() => {
    mod.foo();
  });
}
