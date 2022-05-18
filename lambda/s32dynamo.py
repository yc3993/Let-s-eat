import json
import boto3
import pandas as pd
import pytz
import io
# import decimal

def lambda_handler(event, context):
    aws_session = boto3.Session()
    client = aws_session.client('s3', region_name="us-east-1")
    
    def get_data_frame():
        print("s3 main called")
        csv_obj = client.get_object(Bucket="yelp-restaurants-information", Key="restaurants3.csv")
        body = csv_obj['Body']
        df = pd.read_csv(io.BytesIO(body.read()))
        return df
    
    def put_items(df):
        print("DynamoDB put_items called")
        for i, row in df.iterrows():
            dynamodb = boto3.client('dynamodb', region_name='us-east-1')
            item = row.to_dict()
            dynamodb.put_item(
                TableName = 'yelp',
                Item={
                    'restaurant_id': {'S': str(item['restaurant_id'])},
                    'name': {'S': str(item['names'])},
                    'restaurant_type': {'S': str(item['restaurant_type'])},
                    'address': {'S': str(item['address'])},
                    'latitude': {'S': str(item['latitude'])},
                    'longitude': {'S': str(item['longitude'])},
                    'num_of_reviews': {'S': str(item['num_of_reviews'])},
                    'rating': {'S': str(item['rating'])},
                    'zip_code': {'S': str(item['zip_code'])},
                })

        print("DynamoDB put_items completed")
        # print(num)
    
    
    df = get_data_frame()
    put_items(df)
        
    

