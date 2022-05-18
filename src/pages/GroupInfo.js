import React from 'react';
import styles from '../style/Group.module.css';
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { SettingsSystemDaydreamRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function GroupInfo() {
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
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  

  return (
    <form className={styles['head']} onSubmit={handleSubmit} >
      <div className={styles['head']}>
      <h1 className={styles['h1']}><strong>Group Information</strong></h1>
      <label className={styles['label']}>Group ID:  </label>
      <input className="input" value={id} onChange={(e) => setId(e.target.value)} />
      </div>
      <div className={styles['head']}>
      <label className={styles['label']}>Name:  </label>
      <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field has-addons">
      <button className='button' onClick={getLocation()}>Get my current location</button>
      <label className={styles['label']}>Location:  </label>
      <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} />
      <button className="button" onClick={async () => {  
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
                }>Get Your lat and lng</button>
      </div>
      <div className={styles['head']}>
        <label className={styles['label']}>First Preference:  </label>
        <select className="input" value={first} onChange={(e) => setFirst(e.target.value)}>
          <option value='chinese'>Chinese</option>
          <option value='tradamerican'>Tradamerican</option>
          <option value='italian'>Italian</option>
          <option value='japanese'>Japanese</option>
          <option value='mexican'>Mexican</option>
          <option value='indpak'>Indian</option>
        </select>
      </div>
      <div >
        <label className={styles['label']}>Second preference:  </label>
        <select className="input"  value={second} onChange={(e) => setSecond(e.target.value)}>
          <option value='chinese'>Chinese</option>
          <option value='tradamerican'>Tradamerican</option>
          <option value='italian'>Italian</option>
          <option value='japanese'>Japanese</option>
          <option value='mexican'>Mexican</option>
          <option value='indpak'>Indian</option>
        </select>
      </div>
      <div className={styles['head']}>
        <label className={styles['label']}>Third preference:  </label>
        <select className="input" value={third} onChange={(e) => setThird(e.target.value)}>
          <option value='chinese'>Chinese</option>
          <option value='tradamerican'>Tradamerican</option>
          <option value='italian'>Italian</option>
          <option value='japanese'>Japanese</option>
          <option value='mexican'>Mexican</option>
          <option value='indpak'>Indian</option>
        </select>
      </div>
      <button className={styles['button']} onClick={async () => {  
                       
                       const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({"name": name, 'id':id, 'lat':lat, 'lng':lng,  'first':first, 'second':second, 'third': third})
                    };
                    fetch('https://2mpugrcko7.execute-api.us-east-1.amazonaws.com/v1', requestOptions)
                    .then(response => response.json())
                    .then(data => setLocation(data))                    
                    .then(setShow(!show))                 
                    

                  }
                }>Submit</button>
                 <div>
      {
        show && (<Link to="/show" state={id}>
        <div >
            <span className='icon is-small'>See your recommandation!</span>
        </div>  
        </Link>   
        )
                }
      </div>
      
    </form>
    
  )
}

export default GroupInfo
