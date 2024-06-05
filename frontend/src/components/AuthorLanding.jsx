import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography, Button, Container, Grid, Card, CardContent, List, ListItem,
  ListItemAvatar, ListItemText, Avatar
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BookIcon from '@mui/icons-material/Book';  // Ensure this import is here
import '../styles/AuthorLanding.css';

function Author() {
  const navigate = useNavigate();

  // Function to navigate to the add book page
  const handleAddBook = () => {
    navigate('/add-book');  // Update this route as necessary
  };

  // Sample data for events and coupons
  const events = [
    { id: 1, title: 'Book Signing Event', date: 'April 30, 2024' },
    { id: 2, title: 'Literature Workshop', date: 'May 15, 2024' }
  ];

  const coupons = [
    { id: 1, code: 'SAVE10', description: '10% off on your next purchase' },
    { id: 2, code: 'SUMMER20', description: '20% off for summer reads' }
  ];

  return (
    <Container maxWidth="lg" className="author-container">
      <Typography variant="h4" gutterBottom className="welcome-title">Welcome</Typography>
      
      <Grid container spacing={2} className="content-grid">
        {/* Event Section */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Upcoming Events</Typography>
              <List>
                {events.map((event) => (
                  <ListItem key={event.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <EventAvailableIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={event.title} secondary={event.date} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Coupons Section */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Exclusive Coupons</Typography>
              <List>
                {coupons.map((coupon) => (
                  <ListItem key={coupon.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <LocalOfferIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={coupon.code} secondary={coupon.description} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Add New Book Section */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<BookIcon />}
            onClick={handleAddBook}
          >
            Add New Book
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Author;
