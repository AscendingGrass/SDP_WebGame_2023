/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck


import React, { useEffect } from 'react';
import {  useState } from "react"
import axios from 'axios';
import { Spinner, Tab, Tabs, TabsHeader } from '@material-tailwind/react';

const Login = () => {

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [gender, setgender] = useState(false); // false female, true male
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchAll = async() => {
      setIsLoading(true);
      const temp = (await axios.get(`${backendURL}/user?gender=${gender? "male": "female"}`)).data.result;
      setData(temp);
      setIsLoading(false);
    }
    fetchAll();
  }, [gender])  

  return (
    <div className=" w-full justify-center">
      <Tabs value="html">
        <TabsHeader className='bg-gray-300 w-full'>
          <Tab value={"female"} onClick={()=>{setgender(false)}}>
            Female
          </Tab>
          <Tab value={"male"} onClick={()=>{setgender(true)}}>
            Male
          </Tab>
        </TabsHeader>
      </Tabs>
      <div className="flex justify-center h-full w-full" id="nav-tabContent">
        <div className="grid place-items-center h-5/6 w-full show active overflow-y" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
          {
            isLoading && 
            <Spinner/>
          }
          {
            !isLoading &&
            <table className={`table w-11/12 bg-black border-solid border-8 border-zinc-600`}>
              <thead className=" ">
                <tr className='bg-black text-[#f4f4f4]'>
                  <th className="text-center" scope="col">Rank</th>
                  <th className="text-start" scope="col">Name</th>
                  <th className="text-center" scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item, index) => (
                    <tr key={index}>
                      <td className={`w-2/12 text-center  text-[#f4f4f4]  ${index%2 !=0 && 'bg-stone-800'} ${index%2 ==0 && 'bg-gray-500'}`}>{index + 1}</td>
                      <td className={`w-7/12 text-start  text-[#f4f4f4]  ${index%2 !=0 && 'bg-stone-800'} ${index%2 ==0 && 'bg-gray-500'}`} style={{ width: '60%' }}>{item.username}</td>
                      <td className={`w-3/12 text-center  text-[#f4f4f4]  ${index%2 !=0 && 'bg-stone-800'} ${index%2 ==0 && 'bg-gray-500'}`}>{item.score}</td>
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
