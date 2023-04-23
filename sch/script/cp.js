let path = require('path');
const fs = require('fs');
const { cp } = fs;

const root = path.resolve(__dirname, '../');
cp( root+ '/yd', root + '/tsvcloud/yd', {
  recursive: true,
  force: true,
}, (e) => {
  console.log(e);
});
