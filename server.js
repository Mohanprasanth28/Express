const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');   
require('dotenv').config();
const User = require('./model/User');

const app = express();
app.use(express.json());

app.post('/api/users', (req, res) => {
  const user = new User({
    username: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  user.save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

app.get('/api/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => console.log(err));
});

app.get('/api/user/:email', (req, res) => {
  User.findOne({email: req.params.email})
    .then(users => res.json(users))
    .catch(err => console.log(err));
});
app.delete('/api/users/:email', (req, res) => {
  User.findOneAndDelete({email: req.params.email})
    .then(() => res.json({ remove: true }))
    .catch(err => console.log(err));
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
