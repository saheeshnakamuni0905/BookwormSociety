require('dotenv').config();
const User = require('../schemas/user');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getIo } = require('./io'); 

exports.createUser = async (req, res) => {
    const { email, password, firstName, lastName, type } = req.body;
    if (!email || !password || !firstName || !lastName || !type) {
        return res.status(400).json({ message: 'No field should be left empty.' });
    }

    // Validate the email address
    if (!validator.isEmail(email) || !email.endsWith('@gmail.com')) {
        return res.status(400).json({ message: 'Email must be in xyz@gmail.com format.' });
    }

    // Validate the password strength
    if (!validator.isStrongPassword(password, {
        minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
        return res.status(400).json({ message: 'Password does not meet strength requirements.' });
    }

    // Validate user type
    if (!['admin', 'author', 'reader'].includes(type)) {
        return res.status(400).json({ message: 'Type must be either "admin", "author", or "reader".' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    try {
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            type
        });
        await user.save();
         try {
    await sendEmail({
        to: email,
        subject: 'Welcome to Our Platform!',
        text: ` Hello ${firstName},

        Welcome to BookWorm! We're thrilled to have you join our community of book lovers. Your account has been set up as a ${type}, and you're now ready to explore a vast universe of books, connect with other readers, and dive into your next great adventure.
        At BookWorm, we believe that every book is a new journey, and we're excited to be a part of your reading journey. Whether you're looking to discover new authors, revisit classic tales, or find insights in non-fiction, we've got something for everyone.
        
        Here are a few tips to get started:
        - Explore our curated lists to find your next read.
        - Join discussions and book clubs to connect with fellow book enthusiasts.
        - Take advantage of our personalized recommendations tailored just for you.
        
        Thank you for choosing BookWorm. Happy reading, and remember—there's always room for one more book on your shelf!
        
        Warmest regards,
        The BookWorm Team
        `
    });
    res.status(201).json({ message: 'User created successfully and email sent.' });
} catch (emailError) {
    // Log the email error but still respond with success if user creation was successful
    console.error('Email not sent:', emailError);
    res.status(201).json({ message: 'User created successfully but email could not be sent.' });
}

} catch (error) {
console.error('Failed to create user:', error);
res.status(500).json({ message: 'Internal server error', error: error.message });
}
};

exports.getAllusers = async (req, res) => {
    try {
        const users = await User.find({ type: { $ne: 'admin' } });
        res.json(users);
    } catch (error) {
        console.error("Failed to fetch users:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateUserType = async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;
    if (!type) {
        return res.status(400).json({ message: 'Type must be provided.' });
    }
    if (!['admin', 'author', 'reader'].includes(type)) {
        return res.status(400).json({ message: 'Type must be either "admin", "author", or "reader".' });
    }
    try {
        const user = await User.findByIdAndUpdate(id, { type }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User type updated successfully.', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send('User not found.');
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials.');
        }
        
        const token = jwt.sign(
            { id: user._id, type: user.type },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Logged in successfully', type: user.type, token: token, userId: user._id });
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
};

exports.requestStatus = async (req, res) => {
    const io = getIo();
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, { type: 'reader', authorRequestStatus: 'pending' }, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        io.emit('newAuthorRequest', `New author request from user: ${id}`);
        res.send({ message: 'Request to become an author is pending approval.', user });
    } catch (error) {
        console.error('Error processing author request:', error);
        res.status(500).send({ message: 'Error processing request', error: error.message });
    }
};

exports.approveReq = async (req, res) => {
    const { userId } = req.params;
    try {
        await User.findByIdAndUpdate(userId, { type: 'author', authorRequestStatus: 'approved' });
        res.send({ message: 'Author request approved.' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to approve author request.', error: error.message });
    }
};

exports.rejectReq = async (req, res) => {
    const { userId } = req.params;
    try {
        await User.findByIdAndUpdate(userId, { authorRequestStatus: 'rejected' });
        res.send({ message: 'Author request rejected.' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to reject author request.', error: error.message });
    }
};

exports.getPendingAuthorRequests = async (req, res) => {
    try {
        const pendingAuthors = await User.find({ authorRequestStatus: 'pending' });
        res.status(200).json(pendingAuthors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pending author requests', error: error.message });
    }
};
