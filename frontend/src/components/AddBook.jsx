import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, Box } from '@mui/material';

function AddBook() {
    const [book, setBook] = useState({
        title: '',
        author: '',
        description: '',
        publishDate: '',
        genre: '',
        price: 0,
        image: null
    });

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        // Handling image state separately
        setBook({ ...book, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Append text fields to formData
        for (const key in book) {
            if (key !== 'image') {
                formData.append(key, book[key]);
            }
        }
        // Append image file to formData
        if (book.image) {
            formData.append('image', book.image);
        }

        try {
            const response = await axios.post('http://localhost:3002/book/book/createbook', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            console.log(response.data);
            alert('Book added successfully');
        } catch (error) {
            console.error("Error adding book:", error);
            alert('Failed to add book');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Add Book
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={book.title}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Author"
                                name="author"
                                value={book.author}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                multiline
                                rows={4}
                                value={book.description}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Publish Date"
                                name="publishDate"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={book.publishDate}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Genre"
                                name="genre"
                                value={book.genre}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Price"
                                name="price"
                                type="number"
                                value={book.price}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                component="label"
                                fullWidth
                            >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Add Book
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}

export default AddBook;
