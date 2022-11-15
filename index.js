const jsonServer = require("json-server");
const server = jsonServer.create();
const itemsRouter = jsonServer.router("./data/items.json");
const companiesRouter = jsonServer.router("./data/companies.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(itemsRouter);
server.use(companiesRouter);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
