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

  const cardData = [
    { title: 'Breaking News 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',time: '2 days ago' ,by: 'vichan'},
    { title: 'Technology Update', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',time: '1 days ago' ,by: 'osama bin laden' },
    { title: 'Sports Highlights', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',time: '3 days ago' ,by: 'paulus' },
    { title: 'Entertainment Buzz', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',time: '2 days ago' ,by: 'jasmin' },
    { title: 'Health and Wellness', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',time: '5 days ago' ,by: 'mikasa' },
    { title: 'Travel Destinations', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',time: ' 8 days ago' ,by: 'kenneth' },
    { title: 'Business Insights', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',time: '12 days ago' ,by: 'Breaking News 1' },
    { title: 'Science Discoveries', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',time: ' 24 days ago' ,by: 'eren' },
    { title: 'Fashion Trends', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',time: '32 days ago' ,by: 'yuki' },
    { title: 'Food and Cuisine', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',time: '52 days ago' ,by: 'jojo' },
    { title: 'Movie Reviews', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',time: ' 62 days ago' ,by: 'giorgio' },
    { title: 'Book Recommendations', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',time: '122 days ago' ,by: 'vichan' },
  ];

  return (
    <div className="container  mt-20 "  style=  {{ overflowX: 'auto'}}>
      <div className="row mb-3 grid grid-cols-3 gap-3  w-full">
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
  