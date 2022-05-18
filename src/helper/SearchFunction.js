import {useState, useEffect} from 'react';

import queryString from 'query-string'


export const API_BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/';

export const BEARER_TOKEN = '-3-1-MXaHrMmgus-_0GtUF6RK4w07G5jo6HaVEjzYutoXoLxdBWO681OFpl65JA1Ez1lLepVUIfVq9TkKgdibiIVLcLCK1LU4ftjBvunDFTnXMsvPo_aYtIYeClvYnYx';


export function get(path, name) {
    //const query = queryString.stringify(queryParams);
    return fetch(`${API_BASE_URL}${path}${name}`, {
        headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            Origin: 'localhost',
            withCredentials: true,            
        }
    });
}

export function useBusinessSearch(name) {
    const [businesses, setBusinesses] = useState([]);   
    //console.log(10);
    //const [searchParams, setSearchParams] = useState({name});

    useEffect(() => {
        fetch(`${API_BASE_URL}${name}`, {
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
                Origin: 'localhost',
                withCredentials: true, 
            }           
            }).then(businesses => businesses.json())            
            .then(resp => setBusinesses(resp))
            .then(resp => console.log(resp))
            .catch(error => console.log(error))
          },[])
    return [businesses]; }


    export function useBusinessSearch2(term) {
        const [data, setData] = useState(null);
        
        console.log('eer')
    
        useEffect(() => {
            
            const fetchData = async () => {                
                    console.log('start');
                    const rawData = await fetch('http://127.0.0.1:5000/check');
                    console.log('finish');
                    console.log(rawData);
                    const resp = await rawData.json();
                    setData(resp);
                    console.log(resp);             
                
            };
            fetchData();
        }, [term]);
    }
        
    
            