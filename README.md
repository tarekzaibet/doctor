# Doctor bot
Doctor bot is an Amazon Alexa skill that checks the users health indicators and gives recommendations based on it's response. 

Alexa : Hello, how are you feeling today ?
User : good 
Alexa : Did you sleep well ? 
User : no 
Alexa : Have you done any sports yesterday ? 
User : no 
Alexa : I recommand you to take a little walk today and do some meditation for better sleep.

## Deployment 
Doctor bot is not deployed on Alexa Skills store. You can only used locally on your Amazon Echo or Echo dot. It's deployed as AWS Lambda functions. 

In order to deployed on your device you must create a Lambda function and deploy the code as a zip file.


## Developement Stack

- AWS Developer Console 
- AWS Lambda
- Amazon Lex / Alexa Skills kit for NLP models
- Node JS / REST API 

