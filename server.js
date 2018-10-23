const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {

  console.log();


});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})