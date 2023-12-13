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
  return (
    <div className="container" style={{ overflowX: 'auto' }}>
      <div className="row mt-3 mb-3">
        <div className="col-lg-7">
            <div className="row">
                <div className="form-label">Username</div>
                <input type="text"  className='form-control'/>
            </div>
            <div className="row">
                <div className="form-label">Email</div>
                <input type="text"  className='form-control'/>
            </div>
            <div className="row">
                <div className="form-label">Password</div>
                <input type="text"  className='form-control'/>
            </div>
        </div>
        <div className="col-lg-5">
            <button className='btn btn-danger float-end'
              onClick={handleLogOut}
            >Log Out</button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="row mb-3">
        <div className="col-lg-12">
            <button className='btn btn-outline-danger float-end me-3'
              onClick={handleLogOut}
            >Delete Account</button>
            <button className='btn btn-outline-success float-end me-3'>Save Account</button>
        </div>
      </div>
    </div>
  );
}

export default News;
