const Book = require('../schemas/book');


exports.createBook = async (req, res) => {
    try {
        //const { title, author, description, publishDate, genre, price } = req.body;
        const imagePath = req.file ? `${req.file.path}` : null; // Get the path of the uploaded file if available
        const book = new Book({
            title: req.body.title,
            author:req.body.author,
            description:req.body.description,
            publishDate:req.body.publishDate,
            genre:req.body.genre,
            price:req.body.price,
            image: imagePath,
        });
        await book.save();
        res.status(201).json({ message: 'Book created successfully.', book });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create book', error: error.message });
    }
};


exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get books', error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving book', error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const updates = req.body;
        if (req.file) {
            updates.image = req.file.path; // Update the image path if a new image is uploaded
        }
        const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book updated successfully', book });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update book', error: error.message });
    }
};


exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete book', error: error.message });
    }
};

exports.searchBooks = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        console.log("Search term:", searchTerm);
        // Use a regular expression to make the search case-insensitive and to match any part of the title or author
        const books = await Book.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { author: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        console.log("Found books:", books); 
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Search failed', error: error.message });
    }
};
