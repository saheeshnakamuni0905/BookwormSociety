require('dotenv').config();
const multer = require('multer');

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');
const app = express();
app.use(cors());

const dest = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'api/uploads'); // ensure this directory exists
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  };
  
  const upload = multer({ storage: storage, fileFilter: fileFilter });


router.post('/create', userController.createUser);
router.post('/login',userController.loginUser);
router.delete('/deleteuser/:id',userController.deleteUser);
router.get('/getAllusers', userController.getAllusers); 
router.put('/updateUserType/:id',userController.updateUserType);
router.post('/requestAuthor/:id',userController.requestStatus);
router.put('/approveAuthor/:id',userController.approveReq);
router.put('/rejectAuthor/:id',userController.rejectReq);
router.get('/pendingAuthorRequests', userController.getPendingAuthorRequests);


router.post('/book/createbook', upload.single('image'), bookController.createBook);
router.get('/getAll', bookController.getAllBooks);
router.get('/get/:id', bookController.getBookById);
router.put('/update/:id', upload.single('image'), bookController.updateBook);
router.delete('/delete/:id', bookController.deleteBook);
router.get('/search', bookController.searchBooks);


module.exports = router;