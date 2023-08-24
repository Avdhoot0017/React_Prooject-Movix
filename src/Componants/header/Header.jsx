import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../ContentWrapper/Contentwrapper"
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    window.scrollTo(0,0);
  },[location])


  const controlnavbar =()=> {

   
    if(window.scrollY > 200)
    {
      if(window.scrollY > lastScrollY && !mobileMenu)
      {
        setShow("hide");
      }
      else{
         setShow("show")
      }

    }else{
      setShow("top")
    }
    setLastScrollY(window.scrollY);

   

  }



  useEffect(()=>{

    window.addEventListener("scroll" , controlnavbar);

    return ()=>
    {
      window.removeEventListener("scroll" , controlnavbar);

    }

  },[lastScrollY])



  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);

      setTimeout(() => {
        setShowSearch(false);
        
      }, 1000);
    }
  };


  const openSearch =()=>
  {
    setMobileMenu(false);
    setShowSearch(true);
  }

  const openMobileMenu =()=>
  {
    setMobileMenu(true);
    setShowSearch(false);
  }

  const navigationhandler = (type) =>{

    if(type === "movie")
    {
      navigate("/explore/movie");
    }
    else{
      navigate("/explore/tv")
    }

    setMobileMenu(false); 


  }


 

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" 
         >
          <a href="/"> <img src={logo} alt="logo" /></a>
         
        </div>

        <ul className="menuItems">
          <li className="menuItem" onClick={()=>navigationhandler("movie") }>Movies</li>
          <li className="menuItem" onClick={()=>navigationhandler("tv")}>TV-Shows</li>
          <li className="menuItem">
            <HiOutlineSearch  onClick={openSearch}  />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch  onClick={openSearch}/>
          {mobileMenu ? (<VscChromeClose  onClick={()=> setMobileMenu(false) }/>) : (<SlMenu onClick={openMobileMenu} />)}
        </div>

       
      </ContentWrapper>
      

     { showSearch && <div className="searchBar">

        <ContentWrapper>


        <div className="searchInput">
            <input
              type="text"
              placeholder="Search For TV_Show or Movie..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />

            <VscChromeClose  
            onClick={()=> setShowSearch(false) }/>


           
          </div>
        </ContentWrapper>
       

      </div>}
      

    </header>
  );
};

export default Header;
