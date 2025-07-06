// 1.) Imports
const express = require("express");
const app = express();
const fs = require("fs");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");
const tourRouter = require("./routes/tourRoutes");

// 2.) Middlewares

app.use(morgan("dev"));

app.use(express.json());
app.use((req, resp, next) => {
  console.log("hello from the middleware");
  next();
});

app.use((req, resp, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3.) Controllers

// ---> User controller

// ---> User Routes

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// 5.) Server starts

module.exports = app;
