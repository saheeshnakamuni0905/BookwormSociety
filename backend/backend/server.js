require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./api/routes/routes'); 
const path = require('path');
const { setupIo } = require('./api/controllers/io'); 
const http = require('http');
const app = express();
const server = http.createServer(app);

setupIo(server);

app.use(cors());
app.use(bodyParser.json()); 
app.use('/user', routes);
app.use('/book',routes);
app.use('/uploads', express.static(path.join(__dirname, 'api/uploads')));


mongoURI='mongodb://localhost:27017/Book_Store';
mongoose.connect(mongoURI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('Connection error', err));


const PORT = process.env.PORT || 3002;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

