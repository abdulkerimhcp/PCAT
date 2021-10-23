const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

mongoose.connect(
  'mongodb+srv://abdulkerim:$dYA3D.QmBrp.Kr@cluster0.k9wdu.mongodb.net/pcat-db?retryWrites=true&w=majority'
);

const app = express();

//Template Engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'));

//Routes
const photoController = require('./controllers/photoController');
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.post('/photoss/:id', photoController.deletePhoto);

const pageController = require('./controllers/pageController');
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

const port = process.env.POST || 5000;
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} başlatıldı..`);
});
