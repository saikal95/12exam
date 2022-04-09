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
    return res.send(photos);
  } catch(e) {
    next(e);
  }

  router.post("/", auth, upload.single('image'),async (req, res, next) => {

    try {
      if (!req.body.title) {
        return res.status(400).send({message: 'Body should not be empty'});
      }

      const photoData = {
        title: req.body.title,
        image: null,
        author: req.body.user,
      };

      if (req.file) {
        photoData.image = req.file.filename;
      }

      const photo = new Photo(photoData);

      await photo.save();
      console.log(photo);
      return res.send(photo);
    } catch (e) {
      next(e);
    }
  });

});


module.exports = router;


