import express from 'express';
import path from 'path';
import React from 'react';

const app = express();
const publicPath = path.join(__dirname, '..', 'public');

// ejs templates
app.set('view engine', 'ejs');
app.set('views', publicPath);

// define the folder that will be used for static assets
app.use('/', express.static(publicPath));

// start the server
const env = process.env.NODE_ENV || 'production';
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) return console.error(err);

  return console.info(
    `
      Server running on http://localhost:${port} [${env}]
      Universal rendering: ${process.env.UNIVERSAL ? 'enabled' : 'disabled'}
    `
  );
});
