import React from 'react'
import ContentWrapper from '../../../contentWrapper/ContentWrapper'
import SwitchTab from '../../../switchTabs/SwitchTab'
import { useState } from 'react'
import useFetch from '../../../../hooks/useFetch'
import Carousel from '../../../carousel/Carousel'

const Trending = () => {

    // const [endpoint , setEndpoint] = useState("day");
    const [endpoint,setEndpoint] = useState("day");
    const{data, loading}  = useFetch(`/trending/all/${endpoint}`);






    const onTabChange = (tab)=>{
        setEndpoint(tab === "Day" ? "day" : "week");
    };

  return (
    <div className='carouselSection'>

        <ContentWrapper>

            <span className='carouselTitle'>Trending</span>
            <SwitchTab data={["Day","week"]} onTabChange={onTabChange}/>
        </ContentWrapper>

        <Carousel data={data?.results} loading={loading} />
        
      
    </div>
  )
}

export default Trending
