import React from 'react';
import styles from '../style/Search.module.css';
import { useLocation } from 'react-router-dom';
import { useBusinessSearch } from '../helper/SearchFunction';
import { SearchResult } from '../helper/SearchResult';
import {useState, useEffect} from 'react';

function Search(props) {
  const location = useLocation();
  const history = location.state;  
  
  console.log(history);
  

  

  return (
    <div className={styles['container']}>
    <div className={styles['search-summery']}>
      <h1 className='subtitle'>{history.term}</h1>
    </div>
    <div>
        <strong>Content</strong>
    </div>    
      {Object.entries(history).map(
        ([key, value]) => (<SearchResult key={key} businesses={value}/>)
      )}
    </div>
  )
}

export default Search
