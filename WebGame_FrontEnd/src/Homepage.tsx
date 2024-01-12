/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import HomeNews from "./HomeNews";

const Homepage = () => {

  const [news, setNews] = useState([]);

  useEffect(()=>{
    const fetch = async () =>{
      console.log("aiueo:" + import.meta.env.VITE_BACKEND_URL)
      setNews((await axios.get(`${import.meta.env.VITE_BACKEND_URL}/fetchLatestAnnouncement`)).data.result)
    }

    fetch();
  }, []);

  const cards = [
    { title: 'News 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'News 2', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { title: 'News 3', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
    // Add more objects as needed
  ];

  return (
    <div className="flex justify-center">
      <div className="w-3/4">
        <div className="text-4xl mt-8 font-bold">Latest News :</div>
        <div className="w-full flex flex-grow justify-between mt-10">
          {
            news.length == 0 &&
            <div className="text-4xl">No News</div>
          }
          {
            news.length > 0 &&
            news.map((item, index) => (
              <HomeNews {...item} key={index}/>
            ))
          }
        </div>
        <div className="row mt-3 text-center mt-20">
          <div className="h3">About Game</div>
          <p>
            Welcome to WebGame SDP, With a user-friendly approach, immerse in coding while enjoying an adventurous journey. Beyond gaming, it's a fun learning experience, focusing on practical coding within a vast and exciting gaming world. Our inclusive gaming environment, with a separate gender-based leaderboard, fosters a friendly atmosphere, allowing players to enjoy the game without intense competition pressure. Experience real-time gameplay in an open-world setting, where exploration knows no bounds. Join our fun coding learning community, start your adventure, enhance programming skills, and revel in the beauty of the coding world in a more enjoyable way with WebGame SDP
          </p>
        </div>
      </div>
    </div>
  );
}
  
  export default Homepage;
  