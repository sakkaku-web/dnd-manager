import * as cdk from '@aws-cdk/core';

import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2';

import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';
import { Runtime, Code, Function } from '@aws-cdk/aws-lambda';
import { RetentionDays } from '@aws-cdk/aws-logs';
import { join } from 'path';

export class AppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new HttpApi(this, 'commissionApi', {
      corsPreflight: {
        allowOrigins: [
          'http://localhost:4200',
          'https://sakkaku-web.github.io',
        ],
      },
    });

    const lambdaFolder = '../../dist/libs/lambda';

    const createSession = new Function(scope, 'createSession', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(join(lambdaFolder, 'create-session')),
      handler: 'lambda-create-session.handler',
      logRetention: RetentionDays.ONE_WEEK,
    });

    api.addRoutes({
      path: '/session',
      methods: [HttpMethod.POST],
      integration: new HttpLambdaIntegration('postSession', createSession),
    });
  }
}
