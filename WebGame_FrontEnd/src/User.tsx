/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Table } from "./Component/Table";

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
    <div className="h-full w-full">
      <Table/>
    </div>
  );
}

export default User;
