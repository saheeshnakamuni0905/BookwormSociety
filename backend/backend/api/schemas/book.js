const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    author: {
        type: String,
        required: [true, 'Author is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    publishDate: {
        type: Date,
        required: [true, 'Publish date is required']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    image: {
        type: String,
        required: false  
    }

});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
