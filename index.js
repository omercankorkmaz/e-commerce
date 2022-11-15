const jsonServer = require("json-server");
const items = require("./data/items.json");
const companies = require("./data/companies.json");
const server = jsonServer.create();
const router = jsonServer.router({
  items,
  companies,
});
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
