# DJAAS-AWS
Dad jokes as a service - AWS


## Helpful Commands

### Deploy stack
~~~
aws cloudformation deploy --template-file .\cfn-djaas-main.yaml --stack-name djaas-main --capabilities CAPABILITY_NAMED_IAM
~~~