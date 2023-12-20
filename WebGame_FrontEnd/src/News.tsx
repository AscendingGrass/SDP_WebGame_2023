import axios from "axios";
import { useEffect, useState } from "react";

const News = () => {

  const [news, setNews] = useState([]);

  useEffect(()=>{
    const fetchNews = async () => {
      setNews((await axios.get("http://localhost:3000/fetchAnnouncement")).data.result);
    }

    fetchNews();
  })

  return (
    <div className="container  mt-20 "  style=  {{ overflowX: 'auto'}}>
      <div className="row mb-3 flex flex-wrap  w-full ">
        {news.map((item, index) => (
          <div className="col-lg-4 mb-3 justify-content-evenly justify-center flex " key={index}>
            <div className="card rounded-md table w-3/4 border-solid border-8 border-gray-400 bg-gray-400 ">
              <div className="card-header">
                <div className="card-title text-2xl font-bold">{item.title}</div>
              </div>
              <div className="card-body mt-6">
                {item.description}
              </div>
              <div className="card-footer mt-6">
                {item.created_at}
              </div>
              <div className="card-footer mt-2">
                {item.by}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  
  export default News;
  