import axios from "axios";
import { useEffect, useState } from "react";

const Homepage = () => {

  const [news, setNews] = useState([]);

  useEffect(()=>{
    const fetch = async () =>{
      setNews((await axios.get("http://localhost:3000/fetchLatestAnnouncement")).data.result)
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
              <div className="basis-1/3 flex" key={index}>
                <div className="card card rounded-md table w-3/4 mx-auto border-solid border-8 border-gray-400 bg-gray-400 ">
                  <div className="card-header">
                    <div className="card-title text-2xl font-bold">{item.title}</div>
                  </div>
                  <div className="card-body mt-6">
                    {item.description}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="row mt-3 text-center mt-20">
          <div className="h3">About Game</div>
          <p>
          is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
}
  
  export default Homepage;
  