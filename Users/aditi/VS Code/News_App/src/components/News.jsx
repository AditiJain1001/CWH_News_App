import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from "./Loader";
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8, 
        category: 'general',
      }

      static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number, 
        category: PropTypes.string,
      }

    titleCase = (string) => {
        var sentence = string.toLowerCase().split(" ");
        for(var i = 0; i< sentence.length; i++){
           sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
        return sentence.join(" "); 
    }

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
        document.title = `${this.titleCase(this.props.category)} - Prestige Press`
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f0ac8699e87547b5a43c2f98459ab521&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData); 
        this.setState({articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false})
    }

    async componentDidMount(){ 
        // TODO: REMOVE API KEY
        this.updateNews();
    }

     handlePrevClick = async ()=>{
        this.setState({page: this.state.page - 1})
        this.updateNews();

    }
    
     handleNextClick = async ()=>{
    this.setState({page: this.state.page + 1})
    this.updateNews();
        }

    render() { 
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{marginTop: '105px', marginBottom: '15px'}}>Headlines That Matter</h1>
                <h3 className=" mt-3 mb-5 text-center">Elevate Your Insight: News for the Worldly and Wise</h3>
                {this.state.loading && <Loader/>}
                <div className="row"> 
                {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className="col-md-4 mb-5" key={element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div> 
                })} 
                </div> 
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}> &larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News

// // TODO: Skip over articles that are missing any features

// import PropTypes from "prop-types";
// import React, { Component } from "react";
// import NewsItem from "./NewsItem";
// import Loader from "./Loader";

// export class News extends Component {

//   constructor() {
//     super();
//     this.state = {
//         articles: [],
//         loading: false,
//         page:  1
//     }
//   }

//   async componentDidMount() {
//     console.log("cdm")
//     let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f0ac8699e87547b5a43c2f98459ab521&page=1&pageSize=${this.props.pageSize}`
//     this.setState({loading: true})
//     let data = await fetch(url)
//     let pasrsedData = await data.json()
//     console.log(pasrsedData)
//     this.setState({loading: false, articles: pasrsedData.articles, totalResults: pasrsedData.totalResults})
//   }

//   handleNextClick= async () => {
//     console.log("Next")
//     if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {

//     } else{
//         let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f0ac8699e87547b5a43c2f98459ab521&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
//         this.setState({loading: true})
//         let data = await fetch(url)
//         let pasrsedData = await data.json()
//         this.setState({
//           loading: false,  
//           page: this.state.page + 1,
//             articles: pasrsedData.articles
//         })
//     }

   
//   }

//   handlePrevClick= async () => {
//     console.log("Previous")
//     let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f0ac8699e87547b5a43c2f98459ab521&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
//     this.setState({loading: true})
//     let data = await fetch(url)
//     let pasrsedData = await data.json()
//     console.log(pasrsedData);
//     this.setState({
//         loading: false, 
//         page: this.state.page - 1,
//         articles: pasrsedData.articles
//     })
//   }


//   render() {
//     console.log("render")
//     return (
//       <div className="container  ">
//         <h1 className=" mt-5 text-center">Headlines That Matter:</h1>
//         <h3 className=" mt-3 mb-5 text-center">Elevate Your Insight: News for the Worldly and Wise</h3>

//         {this.state.loading && <Loader/>}
      
//         <div className="row">
//         {this.state.articles.map(
//             (element) => {
//         return <div className="col-md-4 mb-5" key={element.url}>
//             <NewsItem  title={element.title? element.title.slice(0,45) : ""} description={element.description? element.description.slice(0,88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
//           </div>}
//         )}
//         </div>

//         <div className="container d-flex justify-content-between mb-3">
//         <button disabled={this.state.page<= 1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
//         <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
//         </div>
//       </div>
//     );
//   }
// }

// export default News;