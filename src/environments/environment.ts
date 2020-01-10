// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
console.log('process.env: ', process.env);
export const environment = {
  production: false,
  GITHUB_GRAPHQL_API_ENDPOINT: 'https://api.github.com/graphql',

  HOST: 'localhost',
  PORT: 4000,
  WS_PATH: '/subscriptions',
  GRAPHQL_PATH: '/graphql'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
