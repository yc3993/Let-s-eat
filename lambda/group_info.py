import json
import boto3
from decimal import Decimal
import uuid
import json

client = boto3.client('dynamodb')

def lambda_handler(event, context):
    # TODO implement
    print(event)
    id = event['id']
    name = event['name']
    lat = event['lat']
    lng = event['lng']
    first = event['first']
    second = event['second']
    third = event['third']
    data = client.update_item(
      TableName='group_info',
    Key = {
      'ID': {'S': id},
      },
      ExpressionAttributeNames = {
                            '#st': name
                            },
      UpdateExpression="set #st = :count",
      ExpressionAttributeValues={
        ':count': { 'M': {
          'u_longitude': {'S': str(lng)},
          'u_latitude': {'S': str(lat)},
          'pref1': {'S': first},
          'pref2': {'S': second},
          'pref3': {'S': third}
        }}
      }
    
  )
    return {
        'id': 12313
    }
