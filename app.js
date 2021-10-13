const express = require('express');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pcat-db');

const app = express();

//Template Engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} başlatıldı..`);
});
