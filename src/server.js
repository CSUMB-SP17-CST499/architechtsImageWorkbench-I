import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';

//import Main from './main/Main';

const app = express();

// use ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// define the folder that will be used for static assets
app.use(express.static(path.join(__dirname, '..', 'static')));

// universal routing and rendering
app.get('*', (req, res) => {
  let markup = '';
  let status = 200;

  if (process.env.UNIVERSAL) {
    const context = {}
    /*
    markup = renderToString(
      <Main />,
    );
    */
    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
      return res.redirect(302, context.url);
    }

    if (context.is404) {
      status = 404;
    }
  }

  return res.status(status).render('index', { markup });
});

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
