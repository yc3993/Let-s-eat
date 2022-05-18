import React, {useState} from 'react';
import styles from '../style/Group.module.css';


function SignUp() {
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

    const [email, setEmail] = useState("");
    const [show, setShow] = useState(false);
    const [first, setFirst] = useState("");
    const [second, setSecond] = useState("");
    const [third, setThird] = useState("");
    const [location, setLocation] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const firstChange = (event) => {
    setFirst(event.target.value)
  }
  const secondChange = (event) => {
    setSecond(event.target.value)
  }
  const thirdChange = (event) => {
    setThird(event.target.value)
  }

  return (
    <div>
    <h1 className={styles['h1']}><strong>Personal Information</strong></h1>
    <form className={styles['head']}>    
    <div className={styles['head']}>
      <label className={styles['label']}>Email:  </label>
      <input className="input" type={email} value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
    <div className={styles['head']}>
      <label className={styles['label']}>Location:  </label>
      <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} />
      <button className='button' onClick={getLocation()}>Get your current location</button>
      </div>         
        <div>
    <label className={styles['label']}>First Preference:  </label>
      <select className="input" value={first} onChange={firstChange}>
        <option value="chinese">Chinese</option>
        <option value="Tradamerican">Tradamerican</option>
        <option value="Italian">Italianat</option>
        <option value='japanese'>Japanese</option>
        <option value='mexican'>Mexican</option>
        <option value='indpak'>Indian</option>
      </select>
      </div>
      <div>
      <label className={styles['label']}>Second Preference:  </label>
      <select className="input" value={second} onChange={secondChange}>
        <option value="chinese">Chinese</option>
        <option value="Tradamerican">Tradamerican</option>
        <option value="Italian">Italianat</option>
        <option value='japanese'>Japanese</option>
        <option value='mexican'>Mexican</option>
        <option value='indpak'>Indian</option>
      </select>
      </div>
      <div>
      <label className={styles['label']}>Third Preference:  </label>
      <select className="input" value={third} onChange={thirdChange}>
        <option value="chinese">Chinese</option>
        <option value="Tradamerican">Tradamerican</option>
        <option value="Italian">Italianat</option>
        <option value='japanese'>Japanese</option>
        <option value='mexican'>Mexican</option>
        <option value='indpak'>Indian</option>
      </select>
      </div>
      
    </form>
    <div className={styles['head']}>
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
            setShow(!show)
        }        
    }
                }>Submit</button>
                 <div>
      {
        show && (<div><p>First Preference: {first}</p><p>Second Preference: {second}</p> <p>Third Preference: {third}</p><p>Latitude: {lat}</p><p>Longitude: {lng}</p> </div>
        )
                }
      </div>
      <button className='button' onClick={async () => {
          const store = await fetch('https://rc3n4kjl60.execute-api.us-east-1.amazonaws.com/v1',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email':email, 'lat':lat, 'lng':lng, 'first':first, 'second':second, 'third': third})
        })
    }}>Sign Up</button>
      </div>
    </div>
  )
}

export default SignUp
