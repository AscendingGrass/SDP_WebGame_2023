import React from 'react';

const Report = () => {
  const reportData = [
    { id: 1, name: 'John Doe', title: 'Monthly Sales Report', date: '2023-01-15' },
    { id: 2, name: 'Jane Smith', title: 'Quarterly Performance Review', date: '2023-02-20' },
    { id: 3, name: 'Bob Johnson', title: 'Yearly Financial Summary', date: '2023-03-10' },
    { id: 4, name: 'Alice Williams', title: 'Marketing Campaign Analysis', date: '2023-04-05' },
    { id: 5, name: 'Charlie Brown', title: 'Product Development Update', date: '2023-05-22' },
    { id: 6, name: 'Eva Davis', title: 'Employee Satisfaction Survey Results', date: '2023-06-18' },
    { id: 7, name: 'Frank White', title: 'Customer Support Report', date: '2023-07-12' },
    { id: 8, name: 'Grace Lee', title: 'IT Infrastructure Overview', date: '2023-08-29' },
    { id: 9, name: 'Henry Miller', title: 'Risk Assessment Report', date: '2023-09-14' },
    { id: 10, name: 'Ivy Taylor', title: 'Project Status Update', date: '2023-10-07' },
    // Add more report data as needed
  ];

  return (
    <div className="container-fluid">
      <div className="row align-items-center bg-secondary">
        <div className="col-lg-2">
          Sort By
        </div>
        <div className="col-lg-2">
          Filter By
        </div>
        <div className="col-lg-8">
          <div className="row justify-content-end align-items-center">
            <div className="col-lg-5">
              <input type="text" className="form-control" />
            </div>
            <div className="col-lg-2">
              <button>Search</button>
            </div>
          </div>
        </div>
      </div>
      {/* Displaying Report Data */}
      {reportData.map((report) => (
        <div className="row bg-dark py-2" key={report.id}>
          <div className="col-lg-2">
            <div className="form-control bg-dark text-white">{report.name}</div>
          </div>
          <div className="col-lg-2">
            <div className="form-control bg-dark text-white">{report.date}</div>
          </div>
          <div className="col-lg-6">
            <div className="form-control bg-dark text-white">{report.title}</div>
          </div>
          <div className="col-lg-2">
            <select name="" id="" className="form-select bg-dark text-white">
              <option value="">Report</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Report;
