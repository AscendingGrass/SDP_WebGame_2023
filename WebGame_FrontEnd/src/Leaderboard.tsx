import React from 'react';
import Footer from './Footer';

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
  return (
    <div className="row justify-content-center">
      <nav className="col-lg-5">
        <div className="nav nav-tabs justify-content-evenly" id="nav-tab" role="tablist">
          <button className="nav-link active col" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Female</button>
          <button className="nav-link col" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Male</button>
        </div>
      </nav>
      <div className="tab-content row justify-content-center" id="nav-tabContent">
        <div className="tab-pane fade col-lg-5 show active overflow-y" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Name</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {femaleData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ width: '60%' }}>{item.name}</td>
                  <td>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tab-pane fade col-lg-5" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
        <table className="table">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Name</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {maleData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ width: '60%' }}>{item.name}</td>
                  <td>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}

export default Login;
