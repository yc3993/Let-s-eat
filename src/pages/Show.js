import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { SearchResult } from '../helper/SearchResult';
import { Link } from 'react-router-dom';
import styles from '../style/Group.module.css';


function Show() {    
    const location = useLocation();
    const history = location.state;  
    console.log(history);
    const [id , setId]= useState([]);
    const [data, setData] = useState([]);
  return (
    <div className={styles['head']}>
      <button className='button' onClick={async () => {  
        const response = await fetch('https://0e0iu7rh8i.execute-api.us-east-1.amazonaws.com/v1',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'id':history})
        })
        if (response.ok) {
            //console.log(response.json().id);
            const data = await response.json(); 
            const valuesArray = JSON.parse(data.body)           
            //console.log(valuesArray);
            setId(valuesArray.pref1);
            console.log(id);                   
        } 
        fetch(`https://wxy11ptws5.execute-api.us-east-1.amazonaws.com/v1`,{
            'method':'POST',
             headers : {
            'Content-Type':'application/json',
            
      },
      body:JSON.stringify(id)
    })
    .then((response) => response.json()) 
    .then((user) => {
      console.log(user);
      setData(user) //3
    });
      
    console.log(data)
    
    
    
    
    }
                }>Refresh to wait for your friends request</button>
    
    <Link to="/search" state={data}>
        <div className='button'>
            <span className='icon is-small'>Go</span>
        </div>  
        </Link>   
        <button className='button' onClick={async () => {  
        const response = await fetch('https://0e0iu7rh8i.execute-api.us-east-1.amazonaws.com/v1',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'id':history})
        })
        if (response.ok) {
            //console.log(response.json().id);
            const data = await response.json(); 
            const valuesArray = JSON.parse(data.body)    
            var rec = valuesArray.pref1.concat(valuesArray.pref2).concat(valuesArray.pref3);       
            //console.log(valuesArray);
            setId(rec);
            console.log(id);                   
        } 
        fetch(`https://wxy11ptws5.execute-api.us-east-1.amazonaws.com/v1`,{
            'method':'POST',
             headers : {
            'Content-Type':'application/json',
            
      },
      body:JSON.stringify(id)
    })
    .then((response) => response.json()) 
    .then((user) => {
      console.log(user);
      setData(user) //3
    });
      
    console.log(data)
    
    
    
    
    }
                }>Want more recommandation?</button>
    <a href="https://mail.google.com/chat/u/0/#chat/welcome"><button className='button'>Go chatting!</button></a>
        
    
    
      
    </div>
  )
}

export default Show
