import React from "react";
import "./style.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Img from "../../lazyloadcompo/img";
import ContentWrapper from "../../contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.Home);

  const { data, loading } = useFetch("/movie/upcoming");
 

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
   
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="herobanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer">

      </div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="Title">Welcome..</span>
          <span className="subTitle">
            Millions of tV_shows,movies explore now......
          </span>

          <div className="SearchInput">
            <input
              type="text"
              placeholder="Search For TV_Show or Movie..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
