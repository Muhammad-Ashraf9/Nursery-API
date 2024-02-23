const express = require("express");

const teacherRouter = require("./Routes/teacherRoute");
const childRouter = require("./Routes/childRoute");
const classRouter = require("./Routes/classRoute");

const server = express();

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log("server is running on port: ", port);
});

server.use((req, res, next) => {
  console.log(`Logging:request URL ${req.url}  request Method: ${req.method}`);
  // throw new Error("dfasd")
  next();
});

//////////////// parsing requests
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

/////////////// teachers
server.use(teacherRouter);

//////////////// children
server.use(childRouter);

/////////////// classes
server.use(classRouter);

/////////////// Not found
server.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

//////////////// Error handler
server.use((error, req, res, next) => {
  res.status(500).json({ message: error + "" });
});
