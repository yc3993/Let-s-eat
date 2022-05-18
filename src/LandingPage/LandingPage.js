import React, {useState, useEffect} from 'react';
import styles from './LandingPage.module.css';
import { Link } from 'react-router-dom';




function LandingPage() {   
    function showPosition(position) {
        console.log(position.coords.longitude);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }
    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          
        }
      }
    
    const [location, setLocation] = useState('');
    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [third, setThird] = useState('');
    const [temp, setTemp] = useState({});
    const [data, setData] = useState([]);
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [mode, setMode] = useState("");
    const [email, setEmail] = useState("");
    
    
    const [id , setId]= useState([]);
    const thirdChange = (event) => {
        setMode(event.target.value)
      }
  //console.log(businesses);
    


    const OnSubmit = () => {
        fetch(`https://bcjxhu5ca1.execute-api.us-east-1.amazonaws.com/v1/personal_recommendation`,{
            'method':'POST',
             headers : {
            'Content-Type':'application/json',
            'Access-Control-Allow-Methods': "GET",
      },
      body:JSON.stringify({'mode':mode, 'lat':lat, 'lng':lng, 'first':first, 'second':second, 'third': third})
    })
    .then((response) => response.json())    
    .then(id => setId(id));
    console.log(id)
        
        fetch(`http://127.0.0.1:5000/check`,{
            'method':'POST',
             headers : {
            'Content-Type':'application/json',
            'Access-Control-Allow-Methods': "GET",
      },
      body:JSON.stringify(id)
    })
    .then((response) => response.json())    
    .then(data => setData(data))
    
    console.log(data)
    }
    

  return (
  <div className={styles['searcharea']}>
    <h1 className={styles['head']}>Want a new recommendation?</h1>
    <div className="field has-addons">
            <button className="button" onClick={async () => {
          const response = await fetch('https://eehg1y76pf.execute-api.us-east-1.amazonaws.com/v1',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email':email})
        })
        if (response.ok) {
            //console.log(response.json().id);
            const data = await response.json();
            console.log(data)
            setLat(data.lat);
            setLng(data.lng);  
            setFirst(data.first);
            setSecond(data.second);
            setThird(data.third);   
            console.log(first)                        
        }      
    }}>Use my former information</button>    
            <input className="input" 
            onChange={(e) => setEmail(e.target.value)}
            type="email" placeholder='email'/>        
        </div>
        
    <div className="field has-addons">
        
        <div className="control">
            <input className="input" 
            onChange={(e) => setLocation(e.target.value)}
            type="text" placeholder='localtion'/>
        </div>  
        <div className="control">
            <button className="button is-static">First Preference</button>
        </div> 
        <div className="control">
            <select className="input" 
            onChange={(e) => setFirst(e.target.value)}
            type="text" placeholder='type'>
                <option value="chinese">Chinese</option>
        <option value="Tradamerican">Tradamerican</option>
        <option value="Italian">Italianat</option>
        <option value='japanese'>Japanese</option>
        <option value='mexican'>Mexican</option>
        <option value='indpak'>Indian</option>
            </select>
        </div>   
        <div className="control">
            <button className="button is-static">Second Preference</button>
        </div> 
        <div className="control">
            <select className="input" 
            onChange={(e) => setSecond(e.target.value)}
            type="text" placeholder='type'><option value="chinese">Chinese</option>
            <option value="Tradamerican">Tradamerican</option>
            <option value="Italian">Italianat</option>
            <option value='japanese'>Japanese</option>
            <option value='mexican'>Mexican</option>
            <option value='indpak'>Indian</option></select>
        </div>   
        <div className="control">
            <button className="button is-static">Third Preference</button>
        </div> 
        <div className="control">
            <select className="input" 
            onChange={(e) => setThird(e.target.value)}
            type="text" placeholder='type'><option value="chinese">Chinese</option>
            <option value="Tradamerican">Tradamerican</option>
            <option value="Italian">Italianat</option>
            <option value='japanese'>Japanese</option>
            <option value='mexican'>Mexican</option>
            <option value='indpak'>Indian</option></select>
        </div>   
        
    
           
    </div>
    <div className="field has-addons">
      <label className='button is-static'>Mode:  </label>
      <select className='button'  value={mode} onChange={thirdChange}>
        <option value="rating">Rating first</option>
        <option value="location">Location first</option>        
      </select>
      </div>
    <button className='button' onClick={async () => {  
        const response = await fetch('https://e8k81cff12.execute-api.us-east-1.amazonaws.com/v1/trans_location',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'location':location})
        })
        if (response.ok) {
            //console.log(response.json().id);
            const data = await response.json();
            console.log(data)
            setLat(data.lat);
            setLng(data.lng);                                   
        }        
    }
                }>Get my location</button>
    <button className='button' onClick={getLocation()}>Get your current location</button>
    <br></br>
    <button className='button' onClick={async () => {  
        const response = await fetch('https://bcjxhu5ca1.execute-api.us-east-1.amazonaws.com/v1/personal_recommendation',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'mode':mode, 'lat':lat, 'lng':lng, 'first':first, 'second':second, 'third': third})
        })
        if (response.ok) {
            //console.log(response.json().id);
            const data = await response.json();
            console.log(data);
            var rec = data.pref1.concat(data.pref2).concat(data.pref3);
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
    .then(data => setData(data))
    
    console.log(temp)
    }
                }>Search</button>
    <Link to="/search" state={data}>
        <div className='button'>
            <span className='icon is-small'>Go</span>
        </div>  
        </Link>    
    </div>
  )
}

export default LandingPage;
