const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const teacherRouter = require("./Routes/teacherRoute");
const childRouter = require("./Routes/childRoute");
const classRouter = require("./Routes/classRoute");
const authRouter = require("./Routes/AuthenticationRoutes");

const upload = require("./Middlewares/MulterMW");
const authMW = require("./Middlewares/AuthenticationMW");

const swaggerDocs = require("./swagger");

const server = express();

const port = process.env.PORT || 3030;

// connect to database
mongoose
  .connect(`${process.env.DB_LINK}/${process.env.DB_NAME}`)
  .then(() => {
    server.listen(port, () => {
      console.log(`server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// serve swagger documentation
swaggerDocs(server, port);

// enable cors
server.use(cors());

server.use(morgan("combined"));

//////////////// parsing requests
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//parse image by multer
server.use(upload.single("image"));

//register teacher / login Routes
server.use(authRouter);

//authenticate all requests
server.use(authMW);

// serve images statically after authentication
server.use(express.static("images"));

/////////////// teachers
server.use(teacherRouter);

//////////////// children
server.use(childRouter);

/////////////// classes
server.use(classRouter);

/////////////// Not found
server.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

//////////////// Error handler
server.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({ message: error + "" });
});
