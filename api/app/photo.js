const express = require('express');
const Photo = require("../models/Photo");
const path = require("path");
const { nanoid } = require('nanoid');
const multer = require('multer');
const config = require('../config');
const auth = require("../middleware/auth")

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

router.get("/", async (req, res, next) => {
  try {
    const photos = await Photo.find();
    console.log(photos)
    return res.send(photos);
  } catch(e) {
    next(e);
  }
});


module.exports = router;


