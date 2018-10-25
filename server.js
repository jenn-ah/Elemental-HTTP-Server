const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  //const res = response;
  let uri = request.url;
  let reqMethod = request.method;
  const reqVersion = request.httpVersion;


  // response.on('data', (chunk) => {
  //   console.log(`Body:, ${chunk}`);
  // })

  //console.log('this is my request', request);

  //testing nested switch cases
  //console.log('reqMethod', reqMethod);
  switch (reqMethod) {
    case 'GET':

      getHandler(uri, response);
      // response.end();
      break;

    case 'POST':
      //switch (uri) {
      //case '/elements':

      request.on('data', (chunk) => {
        let body = qs.parse(`${chunk}`);
        //console.log('elements', body);
        let elemForm = `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>The Elements - ${body.elementName}</title>
            <link rel="stylesheet" href="/css/styles.css">
          </head>
          <body>
            <h1>${body.elementName}</h1>
            <h2>${body.elementSymbol}</h2>
            <h3>Atomic number ${body.elementAtomicNumber}</h3>
            <p>${body.elementDescription}</p>
            <p><a href="/">back</a></p>
          </body>
          </html>`;

        fs.writeFile(`./public/${body.elementName}.html`, elemForm, (err) => {
          if (err) {
            fs.readFile(`./public/404.html`, (err, data) => {
              if (err) throw err;
              response.setHeader(`Content-Type`, `text/html`);
              response.writeHead(404, 'Not Found');
              response.write(data);
              response.end();
            });
          } else {
            response.setHeader(`Content-Type`, `application/json`);
            response.writeHead(200, 'OK');
            response.write(`{ "success" : true }`);
            response.end();

          }
        });

       // response.end();
      });

      //}
      break;

    case 'PUT':

      break;

    case 'DELETE':

      break;

    default:
      //write else code
      break;
  }

});

function getHandler(uri, res) {
  //readF()
  fs.readFile(`./public${uri}`, (err, data) => {
    if (err) {
      fs.readFile(`./public/404.html`, (err, data) => {
        if (err) throw err;
        res.setHeader(`Content-Type`, `text/html`);
        res.writeHead(404, 'Not Found');
        res.write(data);
        res.end();
      });
    } else {
      res.setHeader(`Content-Type`, `text/${grabType(uri)}`);
      res.setHeader(`Content-Length`, data.length);
      res.writeHead(200, 'OK');
      res.write(data);
      res.end();
    }
  })
};

function grabType(uri) {
  let type = uri.split('.');
  return type[type.length - 1];
}



server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

