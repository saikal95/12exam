const mongoose = require('mongoose');
const config = require("./config");
const Cocktail = require("./models/Cocktail");
const User = require("./models/User");
const { nanoid } = require('nanoid');

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  await User.create(
    {
      email:'sircle98@mail.ru',
      password: '1234789',
      avatar: 'user.png',
      displayName: 'Saiko',
      token: nanoid(),
      role: 'user',
    },
    {
    email:'admin@shop.com',
    password: '12345',
    avatar: 'admin.jpeg',
    displayName: 'Admin',
    token: nanoid(),
    role:'admin',
  })

  const [  ] = await  Cocktail.create({
    user: 'Saiko',
    title: 'Bloody Mary',
    image: 'b52.png',
    recipe: ' Add the rum, cream of coconut and pineapple and lime juices to a shaker with ice and shake vigorously for 20 to 30 seconds.\n' +
      '\n' +
      'Strain into a chilled Hurricane glass over pebble ice.\n' +
      '\n' +
      'Garnish with a pineapple wedge and pineapple leaf.',
    is_published: true,
      description: 'This Bloody Mary recipe makes a spicy, flavorful vodka cocktail. Make it a bloody Mary bar and add as many toppings as you’d like to get your drink just right!',
      ingredient: [{name: 'tomato', quantity: '2' }, {name: 'vodka', quantity: '1 liter'}, {name: 'Garlic salt', quantity: '1 spoon'}]
  },
    {
      user: 'Admin',
      title: 'Pina Collada',
      image: 'pc.jpg',
      recipe: 'Add ice, pineapple juice, rum, if desired, and cream of coconut to bowl of blender. Blend on high speed until ice is crushed, ingredients are combined and drink is smooth, about 30 seconds.\n' +
        '\n' +
        'Pour into glasses. Serve with pineapple wedge and cherry, if desired.',
      is_published: true,
      description: 'The piña colada is a cocktail made with rum, cream of coconut or coconut milk, and pineapple juice, usually served either blended or shaken with ice. It may be garnished with either a pineapple wedge, maraschino cherry, or both. There are two versions of the drink, both originating in Puerto Rico',
      ingredient: [{name: 'coconut', quantity: '2' }, {name: 'cream', quantity: '200 ml'}, {name: 'pineapple', quantity: '2 piec.'}]
    },
    {
      user: 'Saiko',
      title: 'B52',
      image: 'b52.jpg',
      recipe: 'Pour the coffee liqueur into a shot glass.\n' +
        '\n' +
        'Slowly layer the Baileys on top of the coffee liqueur and the Grand Marnier on top of the Baileys.',
      is_published: true,
      description: 'The B-52 cocktail is a layered shot composed of a coffee liqueur, an Irish cream, and a Grand Marnier. When prepared properly, the ingredients separate into three distinctly visible layers. ',
      ingredient: [{name: 'Bayles', quantity: '300ml' }, {name: 'vodka', quantity: '500 ml'}, {name: 'Irish cream', quantity: '4 spoons'}]
    });

  await mongoose.connection.close();
};

run().catch(e => console.error(e));





