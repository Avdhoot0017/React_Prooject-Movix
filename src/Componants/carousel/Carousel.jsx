import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";

import ContentWrapper from "../ContentWrapper/Contentwrapper"
import Img from "../lazyloadcompo/img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circlerating/CircleRating";

import "./style.scss";
import Genres from "../genres/Genres";





const Carousel = ({data, loading , endpoint , title}) => {

  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.Home);
  const navigate = useNavigate();

  const Skitem = ()=>{

    return(
        <div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>

            </div>
        </div>
    )

    
  }

  const navigation = (dir) => {

    const container = carouselContainer.current;

    const scrollamount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20) 

    container.scrollTo({
      left: scrollamount,
      behavior: "smooth", 
    })
    
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />

        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />

        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div key={item.id} className="carouselItem" onClick={()=> navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)}/>
                    <Genres data={item.genre_ids.slice(0,2)}/>
                  </div>

                  <div className="textBlock">
                    <span className="title">
                        {item.title || item.name}


                    </span>

                    <span className="date">
                        {dayjs(item.release_date).format("MMM D, YYYY")};


                    </span>

                  </div>

                </div>
              );
            })}
            
          </div>
        ) : (

            <div className="loadingSkeleton">

                {Skitem()}
                {Skitem()}
                {Skitem()}
                {Skitem()}
                {Skitem()}
                {Skitem()}

            </div>
          
        )};

      </ContentWrapper>
    </div>
  );
};

export default Carousel;
