import json
import boto3
from decimal import Decimal
import json

client = boto3.client('dynamodb')

def lambda_handler(event, context):
    # TODO implement
    print(event)
    email = event['email']
    lat = event['lat']
    lng = event['lng']
    first = event['first']
    second = event['second']
    third = event['third']
    data = client.put_item(
    TableName='cyt_signup',
    Item={
        'email': {'S': email},
        'lat': {'S': str(lat)},
        'lng': {'S': str(lng)},
        'first': {'S': first},
        'second': {'S': second},
        'third': {'S': third}
    })
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
