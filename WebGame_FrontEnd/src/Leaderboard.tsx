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
          <Tab key={"female"} value={"female"} onClick={()=>{setgender(false)}}>
            Female
          </Tab>
          <Tab key={"male"} value={"male"} onClick={()=>{setgender(true)}}>
            Male
          </Tab>
        </TabsHeader>
      </Tabs>
      <div className="flex justify-center h-full w-full" id="nav-tabContent">
        <div className="grid content-center h-5/6 w-full show active overflow-y justify-center" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
          {
            isLoading && 
            <Spinner/>
          }
          {
            !isLoading &&
            <div className="flex w-full">
              <table className={`table w-full bg-black border-solid border-8 border-zinc-600`}>
                <thead className=" ">
                  <tr className='bg-black text-[#f4f4f4]'>
                    <th className=" " scope="col">Rank</th>
                    <th className="" scope="col">Name</th>
                    <th className="" scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {
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
            </div>
          }
        </div>
      </div>
      
    </div>
  );
}

export default Login;
