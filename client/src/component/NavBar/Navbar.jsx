import { useAuth0 } from "@auth0/auth0-react";
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TfiMenu } from "react-icons/tfi";
import { IoClose, IoHomeOutline, IoLogInOutline } from "react-icons/io5";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import style from './Navbar.module.css';
import { useDispatch } from "react-redux";
import { removeLogoutCookie } from "../../redux/reducers/UserReducer";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navRef = useRef();
  const { logout, isAuthenticated } = useAuth0();
  const [loginStatus, setLoginStatus] = useState(false);


  useEffect(() => {
    if (document.cookie) {     
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, [loginStatus, document.cookie]); 

  const showNavbar = () => {
    navRef.current.classList.toggle(style.responsive_nav);
  };

  const hideNavbar = () => {
    if (navRef.current.classList.contains(style.responsive_nav)) {
      navRef.current.classList.remove(style.responsive_nav);
    }
  };

  const handleLogoutClick = async () => {
    hideNavbar();
    const response = await dispatch(removeLogoutCookie());
    if (response) {
      setLoginStatus(false);
      logout({ returnTo: window.location.origin });
    }
  };

  const handleLoginClick = () => {
    hideNavbar();
  };


  return (
    <header>
      <h3>Logo</h3>
      <nav ref={navRef}>
        <Link to='/' onClick={hideNavbar}><IoHomeOutline /></Link>
        {(loginStatus || isAuthenticated) && (
          <>
            <Link to='/cart' onClick={hideNavbar}><CiShoppingCart /></Link>
            <Link to='/user' onClick={hideNavbar}><CiUser /></Link>
            <Link to='/logout' onClick={handleLogoutClick}><MdOutlineLogout /></Link>
          </>
        )}

        {(!isAuthenticated && !loginStatus) && (

          <Link to='/login' onClick={handleLoginClick}><IoLogInOutline /></Link>
        )}

        <Link to='/admin' onClick={hideNavbar}>Admin</Link>
        <button onClick={showNavbar} className={`${style.navBtn} ${style.navCloseBtn}`}>
          <IoClose />
        </button>
      </nav>
      <button onClick={showNavbar} className={style.navBtn}>
        <TfiMenu />
      </button>
    </header>
  );
};

export default Navbar;
