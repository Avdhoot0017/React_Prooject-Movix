import React from 'react'
import "./style.scss"
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../../utils/Api'
import ContentWrapper from "../../ContentWrapper/Contentwrapper";
import noResults from "../Searchresults/no-results.png"
import Spinner from '../../spinner/Spinner'
import MovieCard from '../../moviecard/Moviecard'

const Searchresult = () => {


  const[data,setData] = useState(null);
  const[pageNum , setPageNum] = useState(1);
  const[loading , setLoading] = useState(false);
  const {query} = useParams();


  const fetchinitialdata = ()=>{

    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
      setData(res)
      setPageNum((prev)=>prev+1);
      setLoading(false);
    })}

    const fetchNextPagedata = ()=>{

      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
        
        if(data?.results)
        {
          setData({
            ...data, results: [...data?.results , ...res.results]
          })
        }else{
          setData(res);
        }

        setPageNum((prev)=>prev+1);
      

    })}

   useEffect(()=>{
    setPageNum(1);
    fetchinitialdata();

   },[query])




  return (
    <div className='searchResultsPage'>

      {loading && <Spinner initial={true} /> }
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
            <div className="pageTitle">
              {`search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`}
                
            </div>
            <InfiniteScroll 
              className='content'
              dataLength={data?.results?.length || []}
              next={fetchNextPagedata}
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner/>}
            >
              {data?.results?.map((item, index)=>{
                if(item?.media_type === "person") return;
                return(
                  <MovieCard key={index} data={item} fromSearch={true}/>
                )
              })}
            </InfiniteScroll>
              
            </>
          ) : (
            <span className="resultNotFound">
              Sorry, Results not found..!
            </span>
          )}
        </ContentWrapper>
      )}
       

      
    </div>
  )
}

export default Searchresult
