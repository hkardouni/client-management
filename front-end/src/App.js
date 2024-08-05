import './App.css';
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import AllClients from './Component/AllClients';
import Navbar from './Component/Navbar';
import AddClient from './Component/AddClient';
import Details from './Component/Details';
import Edit from './Component/Edit';
import { useState } from 'react';

function App() {

  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }
  return (
    <BrowserRouter>
      <Navbar onSearchChange={handleSearchChange} />
      <Routes>
        <Route path='/' element={<AllClients searchQuery={searchQuery} />} />
        <Route path='/addclient' element={<AddClient />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
