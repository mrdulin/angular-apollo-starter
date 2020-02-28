import * as AWS from 'aws-sdk';

const ssm = new AWS.SSM();

async function main() {
  const params = { Name: '' };
  const ssmParameterData = await ssm
    .getParameter(params, async (error, data) => {
      if (error) throw error;
      return data;
    })
    .promise();
  return ssmParameterData;
}

export { main };
