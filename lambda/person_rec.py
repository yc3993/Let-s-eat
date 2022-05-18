import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key
from decimal import Decimal

        
def range_query(qrange, rtype, longitude, latitude):
    db = boto3.resource('dynamodb')
    table = db.Table('restaurants_db')
    res = []
    # query by longitude
    try:
        response = table.query(
            IndexName = 'rtype-rlongitude-index',
            KeyConditionExpression = (
                Key('rtype').eq(rtype) &
                Key('rlongitude').between(longitude-qrange, longitude+qrange)
                )
        )
    except ClientError as e:
        print('Error', e.response['Error']['Message'])
    else:    
        for i in response['Items']:
            if latitude-qrange <= i['rlatitude'] <= latitude+qrange:
                res.append(i)
     
    return res


def lambda_handler(event, context):
    info = json.loads(event['body'])
    # print(info)
    # get user's preference
    pref1 = info['first'].lower() if info['first'].lower() != 'indian' else 'indpak'
    pref2 = info['second'].lower() if info['second'].lower() != 'indian' else 'indpak'
    pref3 = info['third'].lower() if info['third'].lower() != 'indian' else 'indpak'

    # recommendation mode
    mode = info['mode'].lower()
    
    # get user's location
    u_longitude = Decimal(info['lng'])  
    u_latitude = Decimal(info['lat']) 
    # coordinates range
    query_range = Decimal(0.002)

    # retrieve relative results from dynamoDB
    p1_res = range_query(query_range, pref1, u_longitude, u_latitude)
    p2_res = range_query(query_range, pref2, u_longitude, u_latitude)
    p3_res = range_query(query_range, pref3, u_longitude, u_latitude)

    # initialize dictionary
    from collections import defaultdict
    def help():
        def help2():
            a = dict()
            return a
        a = defaultdict(help2)
        return a
    all_res = defaultdict(help)         #structure: {'pref': {'rid': {'info': ..., 'dist': ...}}}
    sorted_res = defaultdict(help)
    
    for p in [p1_res, p2_res, p3_res]:
        for item in p:
            if p == p1_res:
                all_res['pref1'][item['rid']]['info'] = item
                all_res['pref1'][item['rid']]['dist'] = abs(all_res['pref1'][item['rid']]['info']['rlatitude'] - u_latitude) \
                + abs(all_res['pref1'][item['rid']]['info']['rlongitude'] - u_longitude)
            elif p == p2_res:
                all_res['pref2'][item['rid']]['info'] = item
                all_res['pref2'][item['rid']]['dist'] = abs(all_res['pref2'][item['rid']]['info']['rlatitude'] - u_latitude) \
                + abs(all_res['pref2'][item['rid']]['info']['rlongitude'] - u_longitude)
            elif p == p3_res:
                all_res['pref3'][item['rid']]['info'] = item
                all_res['pref3'][item['rid']]['dist'] = abs(all_res['pref3'][item['rid']]['info']['rlatitude'] - u_latitude) \
                + abs(all_res['pref3'][item['rid']]['info']['rlongitude'] - u_longitude)

    # sort all_res
    if mode == 'rating':
        for pref in ['pref1','pref2','pref3']:
            sorted_res[pref] = dict(sorted(all_res[pref].items(), key=lambda item: item[1]['info']['rrating'], reverse = True))
    
    elif mode == 'location':
        for pref in ['pref1','pref2','pref3']:
            sorted_res[pref] = dict(sorted(all_res[pref].items(), key=lambda item: item[1]['dist'], reverse = True))
    
    final_results = defaultdict(list)
    for p in sorted_res:
        for r in sorted_res[p]:
            final_results[p].append(r)
    # print(final_results)
    r = {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": {'Access-Control-Allow-Origin': '*'},
        "body": json.dumps(final_results),
        
        }
    print(r)
    
    return r

        