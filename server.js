const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  const uri = request.url;
  const reqMethod = request.method;
  const reqVersion = request.httpVersion;
  //console.log('this is my uri', uri);
  console.log('this is my method', reqMethod);
  console.log('this is my uri', uri);
  console.log('this is my httpVersion', reqVersion);

console.log('request body', request.body);

  switch (uri) {
    case '/':
    case '/index.html':
      //console.log(createHeader('text/html', element.length, 200, 'OK', data));
      //response.write('./index.html');
      fs.readFile('./public/index.html', 'utf8', (err, data) => {
        if (err) throw err;

        response.setHeader('Content-Type', 'text/html');
        response.setHeader('Content-Length', data.length);
        response.writeHead(200, 'OK');
        response.write(data);
        response.end();
      });


      break;

    case '/hydrogen.html':
      //hydrogen response
      fs.readFile('./public/hydrogen.html', 'utf8', (err, data) => {
        if (err) throw err;

        response.setHeader('Content-Type', 'text/html');
        response.setHeader('Content-Length', data.length);
        response.writeHead(200, 'OK');
        response.write(data);
        response.end();

      });
      break;

    case '/helium.html':

      fs.readFile('./public/helium.html', 'utf8', (err, data) => {
        if (err) throw err;

        response.setHeader('Content-Type', 'text/html');
        response.setHeader('Content-Length', data.length);
        response.writeHead(200, 'OK');
        response.write(data);
        response.end();
      });
      break;


    case '/css/styles.css':

      fs.readFile('./public/css/styles.css', 'utf8', (err, data) => {
        if (err) throw err;

        response.setHeader('Content-Type', 'text/css');
        response.setHeader('Content-Length', data.length);
        response.writeHead(200, 'OK');
        response.write(data);
        response.end();
      });
      break;

      case '/elements':
      //reqMethod = 'POST';
      response.setHeader('Content-Type', 'application/x-www-form-urlencoded');


      response.end();
    default:

      fs.readFile('./public/404.html', 'utf8', (err, data) => {
        if (err) throw err;

        response.setHeader('Content-Type', 'text/html');
        response.setHeader('Content-Length', data.length);
        response.writeHead(404, 'Not Found');
        response.write(data);
        response.end();
      });

  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});




// function createHeader (contentType, contentLength, statusCode, reasonPhrase, writeThis) {

//   response.setHeader(`Content-Type ${contentType}`);
//   response.setHeader(`Content-Length ${contentLength}`);
//   response.writeHead(statusCode, reasonPhrase);
//   response.write(writeThis);
//   response.end();

// };