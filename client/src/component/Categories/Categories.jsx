import React from 'react';
import style from './Categories.module.css';
import { useDispatch } from 'react-redux';
import { changeChatgories } from '../../redux/reducers/websiteReducer';


const Categories = ({ categories }) => {
    const dispatch = useDispatch();
   
    const handleChange = (c)=>{
       const result = dispatch(changeChatgories(c));
    }


  return (
    
    <div className={style.categoriesContainer}>
     <h2>Select Categories</h2>
      <ul>
        {
          categories.map((c, index) => (
            <li key={index} className={style.categoryItem} onClick={()=>handleChange(c)}>{c}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default Categories;
