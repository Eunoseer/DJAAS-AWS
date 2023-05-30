# DJAAS-AWS

Dad jokes as a service - AWS

## Helpful Commands

### Deploy stack

Ensure that the deployment bucket exists

~~~text
aws s3 mb s3://djaas-main
~~~

Upload the OpenAPI Schema to the deployment bucket

~~~text
aws s3 cp C:\development\djaas\aws\api\schema.yaml s3://djaas-main/schema.yaml
~~~

Run the package command to upload lambda functions and API Gateway configurations to S3

~~~text
aws cloudformation package --template-file .\cfn-djaas-main.yaml --s3-bucket djaas-main --output-template-file .\build\cfn-djaas-main.yaml
~~~

Run the deploy command for the packaged cloudformation template

~~~text
aws cloudformation deploy --template-file .\build\cfn-djaas-main.yaml --stack-name djaas-main --capabilities CAPABILITY_NAMED_IAM
~~~

Load an initial set of data into the dynamoDB database

~~~text
node .\data\PopulateDynamoDB.js .\data\example.txt Dad_Jokes
~~~

Finally, clean up local build artefacts.

~~~text
#TODO
~~~
