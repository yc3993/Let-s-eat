import json
import googlemaps

def lambda_handler(event, context):
    print(event['body'])
    add = json.loads(event['body'])['location']
    gmaps = googlemaps.Client(key='')
    
    # Geocoding an address
    geocode_result = gmaps.geocode(add)
    body = json.dumps(geocode_result[0]['geometry']['location'])
    
    response = {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": {'Access-Control-Allow-Origin': '*'},
        "body": body
        }
    return response
