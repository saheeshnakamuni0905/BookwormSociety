import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container,Typography, Grid,Card,CardContent, CardMedia,Button,Dialog,DialogTitle,DialogContent,DialogActions,CardActions
} from '@mui/material';
import '../styles/Explore.css'; 
import StarIcon from '@mui/icons-material/Star'; 

function Explore() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3002/book/getAll');
        setBooks(response.data);  
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

    // A function to render star ratings
    const renderRating = (ratingValue) => (
      <div className="book-rating">
        {Array.from({ length: 5 }, (_, index) => (
          <StarIcon key={index} style={{ color: index < ratingValue ? '#ffc107' : '#e0e0e0' }} />
        ))}
      </div>
    );
    const handleOpenDialog = (book) => {
      const randomRating = Math.ceil(Math.random() * 5);
      setSelectedBook({ ...book, rating: randomRating });
      setOpenDialog(true);
    };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBook(null);
  };

  return (
    <Container maxWidth="md" className="explore-container">
      <Typography variant="h3" component="h1" gutterBottom className="explore-header">
      Uncover a Universe of Stories
      <h5>Dive into Our Curated Collection of Books</h5> 
      </Typography>

      <Grid container spacing={4} className="explore-grid">
        {books.map((book, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card className="explore-card">
              <CardMedia
                component="img"
                className="explore-card-media"
                height="140"
                image={book.image ? `http://localhost:3002/uploads/${book.image.split('\\').pop()}` : 'http://localhost:3002/backend/uploads/default-image.jpg'}
                alt={book.title}
              />
              <CardContent className="explore-card-content">
                <Typography gutterBottom variant="h5" component="h2">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {book.author}
                </Typography>
              </CardContent>
              <CardActions className="explore-card-actions">
                <Button size="small" color="primary" onClick={() => handleOpenDialog(book)} className="view-details-btn">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedBook && (
        <Dialog open={openDialog} onClose={handleCloseDialog} className="book-detail-dialog">
          <DialogTitle className="dialog-title">{selectedBook.title}</DialogTitle>
          <DialogContent className="explore-dialog-content">
            <div className="dialog-content-section">
              <strong>Author:</strong> {selectedBook.author}
            </div>
            <div className="dialog-content-section">
              <strong>Genre:</strong> {selectedBook.genre || 'N/A'} 
            </div>
            <div className="dialog-content-section">
              <strong>Price:</strong> ${selectedBook.price || 'N/A'} 
            </div>
            <div className="dialog-content-section">
              <strong>Description:</strong> {selectedBook.description || 'No description available.'}
            </div>
            <div className="dialog-content-section">
            <strong>Rating:</strong> {renderRating(selectedBook.rating)} 
            </div>
          </DialogContent>
          <DialogActions className="explore-dialog-actions">
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}

export default Explore;