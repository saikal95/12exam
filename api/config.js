const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  mongo: {
    db: 'mongodb://localhost/lab95',
    options: {useNewUrlParser: true},
  },
  facebook: {
    appId: '377116674323550',
    appSecret:'6bc1120e4583575889594c5022787b7a'
  }
};