import React,{useEffect,useState} from "react";

import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
 
 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  const updateNews = async ()=>{
    props.setProgress(30);
   const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`;
   
    setLoading(true);
    let data=await fetch(url);
      let parseData=await data.json();
      props.setProgress(70);
      setArticles(parseData.articles)
      setTotalResults(parseData.totalResults)
      setLoading(false)
   
      props.setProgress(100);
  }
useEffect(() => {
  document.title = `${capitalizeFirstLetter(
  props.category
  )} -NewsMonkey`;
  updateNews();
}, []);
  
  const handlePreviousClick = async () => {
    // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}t&apiKey=86e691e85a874a60b0376283e35021ce&page=${this.state.page - 1}&pagesize=${props.pageSize}`;
    // this.setState({loading:true});
    // let data=await fetch(url);
    // let parseData=await data.json();
    // this.setState({})
    //     this.setState({
    //       page:this.state.page - 1,
    //       articles:parseData.articles,
    //       loading:false
    //     })
    setPage(page-1);
    updateNews();
  };
 const  handleNextClick = async () => {
    //if(!(this.state.page + 1  > Math.ceil(this.state.totalResults/props.pageSize))){
    //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=86e691e85a874a60b0376283e35021ce&page=${this.state.page + 1}&pagesize=${props.pageSize}`;
    //   this.setState({loading:true});
    // let data=await fetch(url);
    // let parseData=await data.json();

    // this.setState({})
    //     this.setState({
    //       page:this.state.page + 1,
    //       articles:parseData.articles,
    //       loading:false
    //     })
    //}
   
    setPage(page+1);
    updateNews();
  };

  const fetchMoreData = async () => {
    
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    
    
  };
 
    return (
      <div>
        <h2 className="text-center" style={{margin:'90px 35px 0px'}}>
          NewsMonkey -Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h2>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* {!this.state.loading &&  this.state.articles.map((element)=>{
          return <div className="col-md-4" key={}  >
          <NewsItems title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,45):""}  imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>

        })} */}

              {/* Infinite scrool */}
              {articles.map((element, index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <NewsItems
                      title={element.title ? element.title:""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageurl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; previous</button>
        <button disabled={this.state.page + 1  >Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    );
 
}

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News
