import React from 'react'
import ContentWrapper from "../../../ContentWrapper/Contentwrapper";
import SwitchTab from '../../../switchTabs/SwitchTab'
import { useState } from 'react'
import useFetch from '../../../../hooks/useFetch'
import Carousel from '../../../carousel/Carousel'

const Popular = () => {

    // const [endpoint , setEndpoint] = useState("day");
    const [endpoint,setEndpoint] = useState("movie");
    const{data, loading}  = useFetch(`/${endpoint}/popular`);






    const onTabChange = (tab)=>{
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

  return (
    <div className='carouselSection'>

        <ContentWrapper>

            <span className='carouselTitle'>What's Popular</span>
            <SwitchTab data={["Movies","TV shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>

        <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
        
      
    </div>
  )
}

export default Popular
