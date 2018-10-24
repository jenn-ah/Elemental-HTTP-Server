const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  const uri = request.url;
  const reqMethod = request.method;
  const reqVersion = request.httpVersion;

  function readF(fileLocation, conType, statusCode, reasonPhrase) {
    fs.readFile(fileLocation, (err, data) => {
      if (err) throw err;
      response.setHeader(`Content-Type`, conType);
      response.setHeader(`Content-Length`, data.length);
      response.writeHead(statusCode, reasonPhrase);
      response.write(data);
      response.end();
    });
  };

  // function writeF(fileLocation, conType, statusCode, reasonPhrase) {
  //   fs.writeFile(fileLocation, (err, data) => {
  //     if (err) throw err;
  //     response.setHeader(`Content-Type`, conType);
  //     response.setHeader(`Content-Length`, data.length);
  //     response.writeHead(statusCode, reasonPhrase);
  //     response.write(data);
  //     response.end();
  //   });
  // };

  //testing nested switch cases
  switch (reqMethod) {
    case 'GET':
      switch (uri) {
        case '/': readF('./public/index.html', 'text/html', 200, 'OK');
          break;
        case '/index.html': readF('./public/index.html', 'text/html', 200, 'OK');
          break;
        case '/hydrogen.html': readF('./public/hydrogen.html', 'text/html', 200, 'OK');
          break;
        case '/helium.html': readF('./public/helium.html', 'text/html', 200, 'OK');
          break;
        case '/css/styles.css': readF('./public/css/styles.css', 'text/css', 200, 'OK');
          break;
        default: readF('./public/404.html', 'text/html', 404, 'Not Found');
          break;
      }
      break;

    case 'POST':
      switch (uri) {
        case '/elements':

          console.log('request yo,', request);
          // fs.writeFile('message.txt', data, (err) => {
          //   if (err) throw err;

          //   response.setHeader(`Content-Type`, 'application/x-www-form-urlencoded');
          //   response.setHeader(`Content-Length`, data.length);
          //   //response.writeHead(200, reasonPhrase);
          //   response.write(data);
          //   response.end();




          //   console.log('File has been saved');
          // });


          // fs.writeFile(fileLocation, (err, data) => {
          //       if (err) throw err;
          //       response.setHeader(`Content-Type`, conType);
          //       response.setHeader(`Content-Length`, data.length);
          //       response.writeHead(statusCode, reasonPhrase);
          //       response.write(data);
          //       response.end();
          //     });


          response.end();
      }
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

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
