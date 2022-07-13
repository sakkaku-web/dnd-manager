import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  region: 'eu-central-1',
});

export const handler = async (event: any, context: any) => {
  try {
    return null;
  } catch (err) {
    return err;
  }
};
