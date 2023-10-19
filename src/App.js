import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PersonList from './components/PersonList';
import PersonAdd from './components/PersonAdd';
import PersonHome from './components/PersonHome';

function App() {
  return (
    <Router>
      <div>
        {/* Your header or navigation bar can go here */}
        <Routes>
          <Route path="/" exact element={<PersonHome />} />
          <Route path="/list" element={<PersonList />} />
          <Route path="/add-customer" element={<PersonAdd/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
