import React from 'react';
import Footer from './Footer';
import {  useState } from "react"
const femaleData = [
  { name: 'Alice', score: 2000 },
  { name: 'Eve', score: 2100 },
  { name: 'Grace', score: 2050 },
  { name: 'Ivy', score: 2150 },
  { name: 'Olivia', score: 1980 },
  { name: 'Sophia', score: 2200 },
  { name: 'Emma', score: 1950 },
  { name: 'Ava', score: 2020 },
];

const maleData = [
  { name: 'Bob', score: 1800 },
  { name: 'Charlie', score: 2200 },
  { name: 'David', score: 1900 },
  { name: 'Frank', score: 1950 },
  { name: 'Hank', score: 1980 },
  { name: 'Jack', score: 1920 },
  { name: 'Liam', score: 2100 },
  { name: 'Noah', score: 2150 },
  { name: 'Mason', score: 2050 },
  { name: 'Ethan', score: 2000 },
];


const Login = () => {
  const [gender, setgender] = useState(false)
  return (
    <div className="row justify-content-center space-y-4 mt-40 ">
      <nav className="col-lg-5 place-content-center">
        <div className="nav nav-tabs justify-content-evenly justify-center flex" id="nav-tab" role="tablist">
          <button className={`nav-link active col hover:underline   ${gender == false && 'bg-gray-400'} `} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" onClick={()=>{setgender(false)}}>Female</button>
          <button className={`nav-link col hover:underline ml-40   ${gender == true && 'bg-gray-400'}`} id="nav-profile-tab "  data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" onClick={()=>{setgender(true)}}>Male</button>
        </div>
      </nav>
      <div className="tab-content row justify-content-center " id="nav-tabContent">
        {
          gender == false && <div className="tab-pane fade col-lg-5 show active overflow-y justify-center flex mt-10 " id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
          <table className={`table w-3/6 border-solid border-8 border-zinc-600`}>
            <thead className=" ">
              <tr className='bg-black text-[#f4f4f4]'>
                <th className="w-1/4 " scope="col">Rank</th>
                <th className="w-1/4" scope="col">Name</th>
                <th className="w-1/4" scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {femaleData.map((item, index) => (
                <tr key={index}>
                  <td className={`w-1/4 text-center  text-[#f4f4f4]  ${index%2 !=0 && 'bg-stone-800'} ${index%2 ==0 && 'bg-gray-500'}`}>{index + 1}</td>
                  <td className={`w-1/4 text-center  text-[#f4f4f4]  ${index%2 !=0 && 'bg-stone-800'} ${index%2 ==0 && 'bg-gray-500'}`} style={{ width: '60%' }}>{item.name}</td>
                  <td className={`w-1/4 text-center  text-[#f4f4f4]  ${index%2 !=0 && 'bg-stone-800'} ${index%2 ==0 && 'bg-gray-500'}`}>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        }
        {
          gender == true && <div className="tab-pane fade col-lg-5  justify-center flex" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
          <table className={` rounded-full table w-3/6 border-solid border-8 border-zinc-600`}>
              <thead className="">
                <tr className="bg-black text-[#f4f4f4]">
                  <th className="w-1/4" scope="col">Rank</th>
                  <th className="w-1/4" scope="col">Name</th>
                  <th className="w-1/4" scope="col">Score</th>
                </tr>
              </thead>
              <tbody className="mr-8 ">
                {maleData.map((item, index) => (
                  <tr key={index}>
                    <td className={`w-1/4 text-center text-[#f4f4f4]  ${index%2 !=0 && 'bg-stone-800'} ${index%2 ==0 && 'bg-gray-500'}`}>{index + 1}</td>
                    <td className={`w-1/4 text-center text-[#f4f4f4]  ${index%2 !=0 && 'bg-stone-800'} ${index%2 ==0 && 'bg-gray-500'}`} style={{ width: '60%' }}>{item.name}</td>
                    <td className={`w-1/4 text-center text-[#f4f4f4]  ${index%2 !=0 && 'bg-stone-800'} ${index%2 ==0 && 'bg-gray-500'}`}>{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
        
      </div>
      
    </div>
  );
}

export default Login;
