import json
import boto3
from decimal import Decimal
import uuid
import json


def lambda_handler(event, context):
    myuuid = uuid.uuid4()
    client = boto3.client('dynamodb')
    data = client.put_item(
    TableName='group_info',
    Item={
        'ID': {'S': str(myuuid)},})
    response = {
      'id': str(myuuid)
      }
      
    # send email
    starter_name = event[0]['name']
    starter_email = event[0]['email']
    LINK = 'https://ui-hw13.s3.amazonaws.com/index.html'
    if len(event) < 2:
        return response
    for i in range(1, len(event)):
        name = event[i]['name']
        email = event[i]['email']
        
        SENDER = "Let us Eat! <{}>".format(starter_email)
        RECIPIENT = email
        CONFIGURATION_SET = "ConfigSet"
        AWS_REGION = "us-east-1"
        SUBJECT = "Group Dining Invitation"
        BODY_TEXT = ("")
        BODY_HTML = """<html>
        <head></head>
        <body>
          <p>
            <div> Hi, {}! {} invites you to eat together. </div>
            <div> Here's your group ID: 
            <div> {} </div>
            <div> Click this link to join the group! </div>
            <div> {} </div>
          </p>
        </body>
        </html>
                """.format(name, starter_name, str(myuuid), LINK)
    
        CHARSET = "UTF-8"
        client = boto3.client('ses',region_name=AWS_REGION)   
        
        try:
            r = client.send_email(
                Destination={
                    'ToAddresses': [
                        RECIPIENT,
                    ],
                },
                Message={
                    'Body': {
                        'Html': {
                            'Charset': CHARSET,
                            'Data': BODY_HTML,
                        }
                    },
                    'Subject': {
                        'Charset': CHARSET,
                        'Data': SUBJECT,
                    },
                },
                Source=SENDER,
    
            )
        except ClientError as e:
            print(e.r['Error']['Message'])
        else:
            print("Email sent! Message ID:"),
            print(r['MessageId'])
            
    return response