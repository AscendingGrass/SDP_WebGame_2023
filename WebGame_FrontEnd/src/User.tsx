import React from 'react';

const User = () => {
  const userData = [
    { id: 1, name: 'John Doe', username: 'johndoe123', email: 'johndoe@example.com' },
    { id: 2, name: 'Jane Smith', username: 'janesmith456', email: 'janesmith@example.com' },
    { id: 3, name: 'Bob Johnson', username: 'bobjohnson789', email: 'bobjohnson@example.com' },
    { id: 4, name: 'Alice Williams', username: 'alicewilliams012', email: 'alicewilliams@example.com' },
    { id: 5, name: 'Charlie Brown', username: 'charliebrown345', email: 'charliebrown@example.com' },
    { id: 6, name: 'Eva Davis', username: 'evadavis678', email: 'evadavis@example.com' },
    { id: 7, name: 'Frank White', username: 'frankwhite901', email: 'frankwhite@example.com' },
    { id: 8, name: 'Grace Lee', username: 'gracelee234', email: 'gracelee@example.com' },
    { id: 9, name: 'Henry Miller', username: 'henrymiller567', email: 'henrymiller@example.com' },
    { id: 10, name: 'Ivy Taylor', username: 'ivytaylor890', email: 'ivytaylor@example.com' },
    // Add more user data as needed
  ];

  return (
    <div className="container-fluid py-2">
      <div className="row justify-content-between">
        <div className="col">
          <div className="h3">List Account</div>
        </div>
        <div className="col">
          <div className="row align-items-center">
            <div className="col-lg-2">
              Search:
            </div>
            <div className="col">
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive mt-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-warning me-2">Edit</button>
                  <button className="btn btn-danger me-2">Delete</button>
                  <button className="btn btn-outline-danger me-2">Ban</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
