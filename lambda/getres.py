import json
import urllib3
from botocore.vendored import requests

def lambda_handler(event, context):
    print(event)
    
    # TODO implement
    id = event
    print(id)
    res = {}
    for i in range(len(id)):
        if id[i]:
            r = requests.get("https://api.yelp.com/v3/businesses/"+id[i], headers={
            "Authorization": "Bearer -3-1-MXaHrMmgus-_0GtUF6RK4w07G5jo6HaVEjzYutoXoLxdBWO681OFpl65JA1Ez1lLepVUIfVq9TkKgdibiIVLcLCK1LU4ftjBvunDFTnXMsvPo_aYtIYeClvYnYx",
            "Origin": "localhost",
            "withCredentials": "true"
        })
            res[i] = r.json()
        #print(r.json())
    #res['num'] = 5
    #print(res)

    return res
