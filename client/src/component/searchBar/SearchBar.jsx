import React from 'react';
import style from './SearchBar.module.css';
import { useDispatch } from 'react-redux';

const SearchBar = () => {
    const dispatch = useDispatch();
    const handleChange = ()=>{

    }
  return (
    <div className={style.searchBarContainer}>
      <input 
        type='text' 
        placeholder='Search' 
        className={style.searchInput}
      
      />
    </div>
  );
}

export default SearchBar;
