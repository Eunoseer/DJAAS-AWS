# DJAAS-AWS
Dad jokes as a service - AWS


## Helpful Commands

### Deploy stack
~~~
aws cloudformation deploy --template-file .\cfn-djaas-main.yaml --stack-name djaas-main --parameter-overrides file://.\override-parameters.json --capabilities CAPABILITY_NAMED_IAM
~~~