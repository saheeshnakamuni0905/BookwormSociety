import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography, Button, TextField, Box, Dialog, DialogTitle, DialogContent,
  List, ListItem, ListItemText
} from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BookIcon from '@mui/icons-material/Book';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css'; 

function Home() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const userId = useSelector(state => state.auth.userId);

  useEffect(() => {
    console.log('User ID from Redux:', userId); 
  }, [userId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const handleNavigate = path => {
    navigate(path);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearchChange = event => {
    const query = event.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]); 
    }
  };

  const handleBecomeAuthor = async () => {
    if (!userId) {
      console.error('User ID is undefined');
      alert('User ID is missing');
      return;
    }
    try {
      await axios.post(`http://localhost:3002/user/requestAuthor/${userId}`);
      alert('Your request to become an author has been sent.');
      handleCloseDialog(); 
    } catch (error) {
      console.error('Failed to send author request:', error);
      alert('Failed to send request');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return; 
    }
    
    try {
      const response = await axios.get(`http://localhost:3002/book/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.data;
      setSearchResults(data.books || []);
    } catch (error) {
      console.error('Failed to fetch books:', error);
      alert("Failed to fetch books: " + error.message);
    }
  };

  return (
    <Box className="home-container">
      <Box className="header-container">
        <Typography variant="h2" color="primary" className="title">
          Welcome to BookWorm
        </Typography>
        <Typography variant="h5" className="subtitle">
          "Explore a world of knowledge. Dive into our vast collection and discover your next great read."
        </Typography>

        <TextField
          fullWidth
          label="Search thousands of books, authors, and genres"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
          className="search-field"
        />

        <Box className="search-results">
          {searchResults.length > 0 ? (
            searchResults.map(book => (
              <Box key={book._id} className="book-preview">
                <img
                  src={book.image ? `http://localhost:3002/uploads/${book.image.split('\\').pop()}` : 'http://localhost:3002/backend/uploads/default-image.jpg'}
                  alt={book.title}
                  className="book-image"
                />
                <Box className="book-details">
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography variant="body2">{book.author}</Typography>
                </Box>
              </Box>
            ))
          ) : searchQuery.trim().length > 0 && (
            <Typography variant="subtitle1" className="no-books-found">
              No books found.
            </Typography>
          )}
        </Box>
      </Box>

      <Box className="button-section">
        <Button variant="contained" color="primary" startIcon={<LibraryBooksIcon />} onClick={() => handleNavigate('/explore')} className="explore-books">
          Explore Books
        </Button>
        <Button variant="contained" color="secondary" startIcon={<ImportContactsIcon />} onClick={() => handleNavigate('/authors')} className="meet-authors">
          Meet the Authors
        </Button>
        <Button variant="contained" color="success" startIcon={<AddBoxIcon />} onClick={handleOpenDialog} className="subscribe">
          Subscribe for Premium
        </Button>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        className="subscription-dialog">
        <DialogTitle className="dialog-title">Join BookWorm Premium</DialogTitle>
        <DialogContent className="dialog-content">
          <Typography gutterBottom className="premium-offer">
            Unlock exclusive features and content:
          </Typography>
          <List>
            <ListItem className="feature-item">
              <BookIcon className="icon" />
              <ListItemText primary="Submit Your Own Books for Review" className="feature-text" />
            </ListItem>
            <ListItem className="feature-item">
              <EventIcon className="icon" />
              <ListItemText primary="Attend Author Events for Free" className="feature-text" />
            </ListItem>
            <ListItem className="feature-item">
              <GroupIcon className="icon" />
              <ListItemText primary="Join Exclusive Book Discussion Groups" className="feature-text" />
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleBecomeAuthor}
            className="subscribe-button">
            Subscribe Now
          </Button>
        </DialogContent>
      </Dialog>

      <Box className="slider-container">
        <Slider {...settings} className="slider">
          <div className="slide">
            <img src="meet-up.webp" alt="First Slide" className="slide-image" />
          </div>
          <div className="slide">
            <img src="aristotl.webp" alt="Second Slide" className="slide-image" />
          </div>
          <div className="slide">
            <img src="yellowface.webp" alt="Third Slide" className="slide-image" />
          </div>
        </Slider>
      </Box>
    </Box>
  );
}

export default Home;
