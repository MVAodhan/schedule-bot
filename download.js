const fs = require('fs');
const Path = require('path');
const axios = require('axios');

async function download(episode) {
  const dirPath = Path.resolve(__dirname, 'tmp', 'image.jpg');

  const response = await axios({
    method: 'get',
    url: `${episode.uri}/poster.jpg`,
    responseType: 'stream',
  });
  response.data.pipe(fs.createWriteStream(dirPath, { type: 'image/jpg' }));

  return new Promise((resolve, reject) => {
    response.data.on('end', () => resolve());

    response.data.on('error', (err) => {
      console.log('error from download promise');
      reject(err);
    });
  });
}

module.exports = { download };
