import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Fragment, useEffect } from 'react';
import React from 'react';


function Post({ title, summary, img, url}){
  return (
    <div className='post-container'>
      <a href={url}><img className='post-img' src={img}/></a>
      <p className='post-title' id='title'>{title}</p>
      <p className='post-summary' id='summary'>{summary}</p>
    </div>
  )
}

function App() {
  const [loaded, setLoaded] = React.useState(false);
  const [posts, setPosts] = React.useState();

  useEffect(() => {
    axios.get(`https://api.spaceflightnewsapi.net/v4/articles/`)
      .then(data => {
        const articles = [];
        data.data.results.forEach(element => {
          let temp = {title: element.title, summary: element.summary, img: element.image_url, url: element.url};
          articles.push(temp);
        });
        setPosts(articles);
        setLoaded(true);
      })
  }, [])
  

  return (
    <Fragment>
    <div className="App">
      <h1>Space News</h1>
      <ul>
        {loaded ? posts.map(post => {           
          return(
          <li key={post.title} className='post'>
            <Post title={post.title} summary={post.summary} img={post.img} url={post.url} key={0}></Post>
          </li>)
        }) : console.log("loading...")}
      </ul>
    </div>
    </Fragment>
  );
}

export default App;
