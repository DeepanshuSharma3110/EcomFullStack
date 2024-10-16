
import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import SearchBar from "../../component/searchBar/SearchBar";
import Categories from "../../component/Categories/Categories";
import { useDispatch, useSelector } from "react-redux";
import { fetch10Item, fetchAllCategories, fetchByCategories } from "../../redux/reducers/ProductReducer.js";
import Card from "../../component/Card/Card.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginWithGoole } from "../../redux/reducers/UserReducer.js";

const Home = () => {
  const { user, isAuthenticated } = useAuth0();

  const [ten, setTen] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const dispatch = useDispatch();
  const website = useSelector((state) => state.website);
  
  
  const fetchCategories = async () => {
    const result = await dispatch(fetchAllCategories());
    setCategories(result.payload);
  };


  const fetch10Product = async () => {
    const result = await dispatch(fetch10Item());
    if(result.payload.length === 0 ){
      const secondTry = await dispatch(fetch10Item());
      setTen(secondTry.payload);
    }    
    setTen(result.payload);
  };

  const refreshProducts = async () => {
    if (website.isCategoriesSelected) {
     const response = await dispatch(fetchByCategories(website.selectedCategories));
     setTen(response.payload);
    }
  };

  const checkGoogleLogin =async ()=>{
  
    if(isAuthenticated){
      await dispatch(LoginWithGoole({email: user.email, image: user.picture, username: user.name}));
    }
    }


  useEffect(() => {
    fetch10Product();
    fetchCategories();
    checkGoogleLogin();
  }, [dispatch,isAuthenticated, ]);

  useEffect(() => {
    refreshProducts(); 
  }, [website.selectedCategories]);

  return (
    <div className={style.main}>
    
      <SearchBar />

     
      {categories.length > 0 && <Categories categories={categories} />}

    
      <div className={style.tenProducts}> 
        {ten.length > 0 ? (
          ten.map((item) => (
            <Card key={item._id} item={item} /> 
          ))
        ) : (
          <p>No products available.</p> 
        )}
      </div>

     
    </div>
  );
};

export default Home;
