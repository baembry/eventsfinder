const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(__dirname + '/data/db.json');
const middlewares = jsonServer.defaults([]);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
