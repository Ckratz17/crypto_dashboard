import { useEffect, useState } from 'react'
const axios = require("axios");


const NewsFeed = () => {
    const [articles, setArticles] = useState(null)

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://localhost:8000/news'
            
        };

        axios.request(options).then((response) => {
            console.log(response.data)
            setArticles(response.data)
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    console.log(articles)

   const first5Articles = articles?.slice(0,5)

    return (
        <div className="news-feed">
            <h2>NewsFeed</h2>
            {first5Articles?.map((article, _index ) => (
                <div key={_index}>
                    <a href={article.url}><p>{article.title}</p></a>
                </div>))}
        </div>
    )
}

export default NewsFeed