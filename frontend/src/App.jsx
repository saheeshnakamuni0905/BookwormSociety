import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import Navbar from './components/Navbar';
import ExploreAuthor from './components/ExploreAuthors';
import Login from './components/Login';
import Register from './components/Register'; 
import AuthorLanding from './components/AuthorLanding';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Explore from './components/Explore';
import AddBook from './components/AddBook';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate replace to="/home" />} /> {/* New route for registration */}
        <Route path="/" element={isLoggedIn ? <Navigate replace to="/home" /> : <Navigate replace to="/login" />} />
        {isLoggedIn && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/authors" element={<ExploreAuthor/>} />
            <Route path="/authorlanding" element={<AuthorLanding />} /> 
            <Route path="/admin" element={<Admin />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/add-book" element={<AddBook />} />
            {/* Other routes for logged in users */}
          </>
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
