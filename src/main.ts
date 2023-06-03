import * as fs from "fs";
import * as cdk from "aws-cdk-lib";
import * as route53 from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";

import * as yaml from "js-yaml";

// Configuration file
const CONFIG_FILE = "conf/domains.yml";

/**
 *
 * Domain object in the config file
 */
interface Domain {
  // name of the domain
  name: string;

  // description of the domain
  description: string;
}

/**
 *
 * @param filePath
 * @returns
 */
function parseYamlFile(filePath: string): Domain[] {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const yamlData = yaml.load(fileContents) as Domain[];
  return yamlData;
}

/**
 *
 *
 */
export class MyStack extends cdk.Stack {
  /**
   *
   * @param scope
   * @param id
   * @param props
   */
  constructor(scope: Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    const domains: Domain[] = parseYamlFile(CONFIG_FILE);

    domains.forEach((domain: Domain) => {
      new route53.PublicHostedZone(this, domain.name, {
        zoneName: domain.name,
        comment: domain.description,
      });
    });
  }
}

// the AwsEnvironment
const theEnv = {
  account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
};

// create the app and stack
const app = new cdk.App();
new MyStack(app, "p6-domains", { env: theEnv });
app.synth();
