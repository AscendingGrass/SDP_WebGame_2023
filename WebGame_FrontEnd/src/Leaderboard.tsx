import React, { useEffect } from 'react';
import Footer from './Footer';
import {  useState } from "react"
import axios from 'axios';
import { Spinner, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react';

const Login = () => {
  const [gender, setgender] = useState(false); // false female, true male
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchAll = async() => {
      setIsLoading(true);
      const temp = (await axios.get(`http://localhost:3000/user${gender? "Male": "Female"}`)).data.result;
      setData(temp);
      setIsLoading(false);
    }
    fetchAll();
  }, [gender])  

  return (
    <div className=" w-full justify-center">
      <Tabs value="html">
        <TabsHeader className='bg-gray-300 w-full'>
          <Tab key={"female"} value={"female"} onClick={()=>{setgender(false)}}>
            Female
          </Tab>
          <Tab key={"male"} value={"male"} onClick={()=>{setgender(true)}}>
            Male
          </Tab>
        </TabsHeader>
      </Tabs>
      <div className="flex flex-col w-full" id="nav-tabContent">
        <div className="tab-pane fade col-lg-5 show active overflow-y justify-center flex mt-10 " id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
          {
            isLoading && 
            <Spinner/>
          }
          {
            !isLoading &&
            <table className={`table w-3/6 border-solid border-8 border-zinc-600`}>
              <thead className=" ">
                <tr className='bg-black text-[#f4f4f4]'>
                  <th className="w-1/4 " scope="col">Rank</th>
                  <th className="w-1/4" scope="col">Name</th>
                  <th className="w-1/4" scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                
                {
                  !isLoading && 
                  data.map((item, index) => (
                    <tr key={index}>
                      <td className={`w-1/4 text-center  text-[#f4f4f4]  ${index%2 !=0 && 'bg-stone-800'} ${index%2 ==0 && 'bg-gray-500'}`}>{index + 1}</td>
                      <td className={`w-1/4 text-center  text-[#f4f4f4]  ${index%2 !=0 && 'bg-stone-800'} ${index%2 ==0 && 'bg-gray-500'}`} style={{ width: '60%' }}>{item.username}</td>
                      <td className={`w-1/4 text-center  text-[#f4f4f4]  ${index%2 !=0 && 'bg-stone-800'} ${index%2 ==0 && 'bg-gray-500'}`}>{item.score}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          }
        </div>
      </div>
      
    </div>
  );
}

export default Login;
