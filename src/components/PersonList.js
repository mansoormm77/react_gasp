import React, { useEffect } from 'react';
import ResponsiveTable from '../atoms/ResponsiveTable';
import Nav from '../atoms/Nav';
const PersonList = () => {
  const tableHeaders = ['First Name', 'Last Name', 'Email', 'Phone', 'City', 'State'];
  const tableData = [
    ['John','Doe', 'johndoe@example.com', '+917021254695','Mumbai','Maharashtra'],
    ['John','Doe', 'johndoe@example.com', '+917021254695','Mumbai','Maharashtra'],
    ['John','Doe', 'johndoe@example.com', '+917021254695','Mumbai','Maharashtra'],
    ['John','Doe', 'johndoe@example.com', '+917021254695','Mumbai','Maharashtra'],

    // Add more data rows as needed
  ];
  return (
    <div>
      <Nav/>
      <ResponsiveTable headers={tableHeaders} data={tableData} />
     
    </div>
  );
};

export default PersonList;
