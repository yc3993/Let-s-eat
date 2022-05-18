import React from 'react';
import styles from '../style/Group.module.css';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";

function GroupRec() {
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [formFields, setFormFields] = useState([
    { name: '', email: '' },
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(formFields)
  }

  const addFields = () => {
    let object = {
      name: '',
      email: ''
    }

    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  return (
    <div className={styles['head']}>
      <h1 className={styles['h1']}>Want some group suggestions?</h1>
      <form onSubmit={submit}>
        {formFields.map((form, index) => {
          return (
            <div key={index}>
              <input
                name='name'
                placeholder='Name'
                onChange={event => handleFormChange(event, index)}
                value={form.name}
              />
              <input
                name='email'
                placeholder='Email'
                onChange={event => handleFormChange(event, index)}
                value={form.email}
              />
              <button  onClick={() => removeFields(index)}>Remove</button>
            </div>
          )
        })}
      </form>
      <button onClick={addFields}>Add More..</button>
      <br />
      <button className={styles['button']} onClick={async () => {                    
                    const response = await fetch('https://762ca81b8a.execute-api.us-east-1.amazonaws.com/v1/id',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formFields)
                    })

                    if (response.ok) {
                        //console.log(response.json().id);
                        const data = await response.json();
                        console.log(data.id)
                        setId(data.id);
                        setShow(!show)
                    }
                }
                }>Submit</button>
      <div>
      {
        show && (<strong> Your ID: {id} </strong>)
                }
      </div>
      <Link to="/ginfo"><button className="button is-static"> Next Step </button></Link>
    </div>
  );
}

export default GroupRec
