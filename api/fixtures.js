const mongoose = require('mongoose');
const config = require("./config");
const Photo = require("./models/Photo");
const User = require("./models/User");
const { nanoid } = require('nanoid');

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [Saiko, Admin] = await User.create(
    {
      email:'sircle98@mail.ru',
      password: '1234789',
      displayName: 'Saiko',
      token: nanoid(),
      role: 'user',
    },
    {
    email:'admin@shop.com',
    password: '12345',
    displayName: 'Admin',
    token: nanoid(),
    role:'admin',
  })

  const [ ] = await  Photo.create({
      title: 'Bloody Mary',
      image: 'bm.jpg',
      author: 'Saiko',
  },
    {
      title: 'Pina Collada',
      image: 'pc.jpg',
      author: 'Admin',

    },
    {
      title: 'B52',
      image: 'b52.jpg',
      author: 'John'

    });

  await mongoose.connection.close();
};

run().catch(e => console.error(e));





