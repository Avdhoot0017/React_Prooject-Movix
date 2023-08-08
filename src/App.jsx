import { useState } from 'react'
import { fetchDataFromApi } from './utils/Api'
import { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './Store/Homeslice';
import Header from "./Componants/header/Header"
import Footer from "./Componants/footer/Footer"
import Home from './Componants/Pages/Home/Home';
import Details from "./Componants/Pages/details/Details"
import Explore1 from './Componants/Pages/explore/Explore1';
import Searchresult from "./Componants/Pages/Searchresults/Searchresult"
import PageNotFound from "./Componants/Pages/404/PageNotFound"
import { BrowserRouter , Route , Routes } from 'react-router-dom';










function App() {


  const dispatch = useDispatch();
  const { url } = useSelector((state) =>state.Home);


  useEffect(()=>{

    fetchApiConfig();
    genresCall();

  },[]);


  const fetchApiConfig = ()=>{

    fetchDataFromApi("/configuration").then((res)=>{


      const url = {

        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original"

      }



      dispatch(getApiConfiguration(url));
       
    })
   
  };

  const genresCall = async ()=>{

    let promises = [];
    let endpoints = ["tv","movie"];
    let allgenres = {};

    endpoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    })

    const data = await Promise.all(promises);
    data.map(({genres})=>{
      return genres.map((item)=> (allgenres[item.id] = item))
    });

      dispatch(getGenres(allgenres));

  }



  return (
    <BrowserRouter>
          <Header/>

    <Routes>
      <Route path="/" element={<Home/> }/>

      <Route path="/:mediaType/:id" element={<Details/> }/>

      <Route path="/search/:query" element={<Searchresult/> } />

      <Route path="/explore/:mediaType" element={<Explore1/> }/>

      <Route path="*" element={<PageNotFound/> }/>

        </Routes>

        <Footer/>
    </BrowserRouter>
  )
}

export default App
