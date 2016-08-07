import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';

async function queryFragmentTypes() {
  fetch(`http://localhost:4000/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {},
      query: `
        {
          __schema {
            types {
              kind
              name
              possibleTypes {
                name
              }
            }
          }
        }
      `
    })
  })
    .then(result => result.json())
    .then(result => {
      const filteredData = result.data.__schema.types.filter(
        type => type.possibleTypes !== null
      );
      result.data.__schema.types = filteredData;
      const filePath = path.resolve(
        __dirname,
        '../src/assets/fragmentTypes.json'
      );
      fs.writeFile(filePath, JSON.stringify(result.data), err => {
        if (err) {
          console.error('Error writing fragmentTypes file', err);
        } else {
          console.log('Fragment types successfully extracted!');
        }
      });
    });
}

queryFragmentTypes();
