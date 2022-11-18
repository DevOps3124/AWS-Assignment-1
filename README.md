# AWS-Assignment-1( Receive Emails Using AWS SES, Lambda, & API Gateway)
# CLIENT-SIDE
1. Simple webpage to make request to the API Gateway
(we will be using this simple webpge by just using HTML)
![Screenshot (401)](https://user-images.githubusercontent.com/117630401/202691068-c841e4bd-dc4a-43d0-8579-ea5676e4cf72.png)


- check form.html for the code

# BACKEND OVERVIEW -

We will use AWS Lambda and Simple Email Service (SES) and API Gateway.
- SES is a serverless messaging service that allows you to send email messages when invoked.
- AWS Lambda allows you to write server-side code to execute in response to events.
- We will also use API Gateway which enables us to invoke Lambda functions via HTTP.

![Screenshot (399)](https://user-images.githubusercontent.com/117630401/202645960-aa603fe3-2c56-4ad3-9bfb-31dad81f8b9f.png)

#Approach-
- Our browser (JavaScript) will make a post request, with the form data in the request body, to an endpoint URL specified by AWS API Gateway
- The API Gateway will validate this request. Then it will trigger the Lambda function which accepts an event parameter. 
  API Gateway will put the form data in the body property of the event parameter.
- Our Lambda function will extract the data from the event body and we will then use this data to build the body of the email we want to send as well as its recipients. Our function will then use the AWS SDK to invoke SES with the email data.
- Once SES gets the sendMail request, it turns the email data into an actual text email and sends it to the recipient via AWS's own mail servers.

# STEP- 1 Setup SES(Simple Email Service)
1. Go to AWS console
2. go to the SES service —>click on Email Addresses in the side menu
3. click on the "Verify a New Email Address" button.
- Enter the email address that you want the SES service to put as the sender when it sends the email.
- This will send an email to this provided email address, a click on the link to verify.
- click the "Send a Test Email" button. This will let us put in a recipient's email address, a subject, and a message and send it.

# STEP -2 Setup Lambda function
- Create an IAM Role and configure it!
1. From AWS console, go to the IAM service —> click on Policies in the side menu —> click on the "Create Policy" button.
2. In the policy creation page, go to the JSON tab and paste the below defined  permissions, then click Next.
 # {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendRawEmail"
            ],
            "Resource": "*"
        }
    ]
}

3.  create an IAM role which will be attached to the lambda and link it to the permissions policy which we just created.
4. Now we can create a new lambda function. Go to the Lambda service dashboard and click the "Create Function" button.
5. In the function creation screen, name your function, select the "Author from scratch" option, and choose Node.js as the runtime.
6. Under "Change default execution role" choose the "Use an existing role" option 
7. Click the "Create function" button to create the function.

# STEP - 3 Setup API Gateway
- Another AWS service we are going to use is API Gateway, which will enable our browser to send HTTP requests to the Lambda function we created.
1. On lambda function page, expand the "Function overview" section and click on "Add trigger".
2. choose API Gateway from the dropdown,  choose HTTP API as the API type, "Open" as the security mechanism, check the CORS checkbox option, then click "Add".
3. we will be redirected to the "Configuration" tab of lambda function, showing us the new API Gateway trigger we just created. 
- From there note the API endpoint, this is the URL we are going to be calling from our browser.

