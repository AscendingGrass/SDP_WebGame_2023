// @ts-nocheck
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';

const News = () => {
  const { state, dispatch } = useData();
  const navigate = useNavigate();
  const handleLogOut = ()=>{
    dispatch({ type: 'LOGOUT_USER'})
    navigate("/");
  }

  import.meta.env.BASE_URL
  return (
    <div className="container ml-60" style={{ overflowX: 'auto' }}> 
    
      <div className="row mb-3">
            <div className="col-lg-5">
            <button className='btn text-slate-200 btn-danger mt-20 float-end bg-red-500 w-40 border-solid border-2 border-red-600 rounded-md'
              onClick={handleLogOut}
            >Log Out</button>
            </div>
        <div className="col-lg-12">
            <button className='btn text-slate-200 mt-2 btn-outline-danger float-end me-3 float-end bg-red-500 w-40 border-solid border-2 border-red-600 rounded-md'
              onClick={handleLogOut}
            >Delete Account</button>
            
        </div>
        <div className="col-lg-12">
            
            <button className='btn text-slate-200 mt-2 btn-outline-success float-end me-3 float-end bg-sky-500 w-40 border-solid border-2 border-sky-600 rounded-md'>Save Account</button>
            
        </div>
      </div>
     
      <br />
      <br />
      <br />

      <div className="row mt-3 mb-3">
        <div className="col-lg-7">
            <div className="row">
                <div className="form-label text-xl">Username</div>
                <input type="text"  className='form-control  float-end  w-96 border-solid border-2 border-gray-600 rounded-md'/>
            </div>
            <div className="row">
                <div className="form-label text-xl">Email</div>
                <input type="text"  className='form-control float-end  w-96 border-solid border-2 border-gray-600 rounded-md'/>
            </div>
            <div className="row">
                <div className="form-label text-xl">Password</div>
                <input type="text"  className='form-control float-end  w-96 border-solid border-2 border-gray-600 rounded-md'/>
            </div>
        </div>
        
      </div>
    </div>
  );
}

export default News;
