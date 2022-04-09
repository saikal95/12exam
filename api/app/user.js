const express = require('express');
const mongoose = require('mongoose');
const User = require("../models/User");
const path = require("path");
const multer = require('multer');
const { nanoid } = require('nanoid');
const config = require('../config');
const axios = require('axios');

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});



router.post('/',async (req, res, next) => {

  try {

    console.log(req.body.user);

      if (!req.body.email || !req.body.password ||!req.body.displayName) {
        return res.status(400).send({message: 'Email, password or displayName are required'});
      }

    const userData = {
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      token: req.token,
    };

      console.log(userData);

    if (req.file) {
      userData.avatar = req.file.filename;
    }
    const user = new User(req.body);
    user.generateToken();
    await user.save();
    return res.send(user);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});


router.post('/sessions', async (req, res) => {

  const user = await User.findOne({email: req.body.email});
  if (!user) {
    return res.status(400).send({error: 'Email not found'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(400).send({error: 'Password is wrong'});
  }

  user.generateToken();

  await user.save();



  return res.send(user);
});

router.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const message = {message: 'OK'};

    if (!token) return res.send(message);

    const user = await User.findOne({token});

    if (!user) return res.send(message);

    user.generateToken();
    await user.save();

    return res.send(message);
  } catch (e) {
    next(e);
  }
});


router.post('/facebookLogin', async (req, res, next) => {
  try {
    const inputToken = req.body.authToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    const response = await axios.get(debugTokenUrl); // response.data = {}

    if (response.data.data.error) {
      return res.status(401).send({message: 'Facebook token incorrect'});
    }

    if (req.body.id !== response.data.data.user_id) {
      return res.status(401).send({message: 'Wrong User ID'});
    }

    let user = await User.findOne({facebookId: req.body.id});

    if (!user) {
      user = new User({
        email: req.body.email,
        password: nanoid(),
        facebookId: req.body.id,
        displayName: req.body.name
      });
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    next(e);
  }
})

module.exports = router;
