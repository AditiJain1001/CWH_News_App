import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Loader from "./Loader";
import PropTypes from 'prop-types';

const News = ({ country = 'in', pageSize = 8, category = 'general' }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=f0ac8699e87547b5a43c2f98459ab521&page=${page}&pageSize=${pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    };

    fetchData();
  }, [country, category, page, pageSize]);

  const handlePrevClick = async () => {
    setPage(prevPage => prevPage - 1);
  };

  const handleNextClick = async () => {
    if (!(page + 1 > Math.ceil(totalResults / pageSize))) {
      setPage(nextPage => nextPage + 1);
    }
  };

  return (
    <div className="container my-3">
      {/* Your JSX content here, unchanged */}
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;