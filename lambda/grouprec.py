import json
from collections import defaultdict, Counter
from decimal import Decimal
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key


def pref_poll(all_pref):
    votes = defaultdict(int)
    top3 = []
    for user in all_pref:
        for choice in range(len(all_pref[user])):
            if choice == 0:
                votes[all_pref[user][choice]] += 3
            elif choice == 1:
                votes[all_pref[user][choice]] += 2
            elif choice == 2:
                votes[all_pref[user][choice]] += 1
    c = Counter(votes)
    most_com = c.most_common(3)
    # print(most_com)
    for i in most_com:
        top3.append(i[0])
    return top3

def find_center(locations):
    sum_lati = 0
    sum_longi = 0
    for user in locations:
        sum_lati += locations[user][0]
        sum_longi += locations[user][1]
    numOfMembers = len(locations)
    return (sum_lati/numOfMembers, sum_longi/numOfMembers)

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

def lookup_dynamo(key, table='group_info'):
    db = boto3.resource('dynamodb')
    table = db.Table(table)
    try:
        response = table.get_item(Key=key)
    except ClientError as e:
        print('Error', e.response['Error']['Message'])
    else:
        return response['Item']

def lambda_handler(event, context):
    #print(event)
    id = event['id']
    all_pref = defaultdict(list)
    users_locations = defaultdict(list)
    group_info = lookup_dynamo({"ID": str(id)})
    for u in group_info:
        if u == "ID":
            continue
        try:
            if group_info[u]['pref1']:
                all_pref[u].append(group_info[u]['pref1'].lower())
            if group_info[u]['pref2']:
                all_pref[u].append(group_info[u]['pref2'].lower())
            if group_info[u]['pref3']:
                all_pref[u].append(group_info[u]['pref3'].lower())
        except:
            print('error')
        users_locations[u] = (Decimal(group_info[u]["u_latitude"]), Decimal(group_info[u]["u_longitude"]))
    print(all_pref)
    print(users_locations)
    '''
    # get group members' preferences
    all_pref = {'user1': ['chinese', 'japanese', 'tradamerican'], 'user2': ['mexican', 'japanese']}
    
    # get group members' preferred dinning locations
    users_locations = {'user1': (Decimal(40.80734), Decimal(-73.96526)), 
                        'user2': (Decimal(40.75678), Decimal(-73.98485))}
    '''          
    # find center coordinates
    center = find_center(users_locations)

    # get top3 favorable cuisines
    top3 = pref_poll(all_pref)              # might be less than 3
    p1_res = [] 
    p2_res = []
    p3_res = []
    
    query_range = Decimal(0.002)
    
    for t in range(len(top3)):
        for l in users_locations.values():
            if t == 0:
                p1_res.append(range_query(query_range, top3[t], l[1], l[0]))
            if t == 1:
                p2_res.append(range_query(query_range, top3[t], l[1], l[0]))
            if t == 2:
                p3_res.append(range_query(query_range, top3[t], l[1], l[0]))
                
        if t == 0:
            p1_res.append(range_query(query_range, top3[t], center[1], center[0]))
        if t == 1:
            p2_res.append(range_query(query_range, top3[t], center[1], center[0]))
        if t == 2:
            p3_res.append(range_query(query_range, top3[t], center[1], center[0]))

    # initialize dictionary
    def help():
        a = dict()
        return a
    all_res = defaultdict(help)         #structure: {'pref': {'rid': 'info'}}
    sorted_res = defaultdict(help)

    for p in [p1_res, p2_res, p3_res]:
        for r in p:
            for item in r:
                if p == p1_res:
                    all_res['pref1'][item['rid']] = item
                elif p == p2_res:
                    all_res['pref2'][item['rid']] = item
                elif p == p3_res:
                    all_res['pref3'][item['rid']] = item
    
    for pref in all_res:
        sorted_res[pref] = dict(sorted(all_res[pref].items(), key=lambda item: item[1]['rrating'], reverse = True))
    final_results = defaultdict(list)
    for p in sorted_res:
        for r in sorted_res[p]:
            final_results[p].append(r)
    print(final_results)
    response = {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": {'Access-Control-Allow-Origin': '*'},
        "body": json.dumps(final_results)
        }

    return response        