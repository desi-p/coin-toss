//modules
const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const readWrite = (page, contentType) => {
    fs.readFile(page, function(err, data) {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(data);
      res.end();
    });
  }
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);

  switch (page){
    case '/':
      readWrite('index.html', 'text/html')
      break
    case '/api':
      res.writeHead(200, {'Content-Type': 'application/json'})
      //random number to determine heads vs tails
      let flipResult = Math.floor(Math.random()*2)
      const objToJson = {
        coin: flipResult,
        heads: 0,
        tails: 0,
      }
      console.log(flipResult)
      res.end(JSON.stringify(objToJson))
      break
    case '/css/style.css':
      fs.readFile('css/style.css', function(err, data) {
        res.write(data)
        res.end()
      })
      break
    case '/js/main.js':
      readWrite('js/main.js', 'text/javascript')
      break
    case '/images/heads.png':
      readWrite('./images/heads.png', 'image/png')
      break
    case '/images/tails.png':
      readWrite('./images/tails.png', 'image/png')
      break
    default:
      figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      });
      break
    }
  })

server.listen(8000);
