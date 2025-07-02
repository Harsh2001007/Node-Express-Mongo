// 1.) Imports
const express = require("express");
const app = express();
const fs = require("fs");
const morgan = require("morgan");

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

const Tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, resp) => {
  resp.status(200).json({
    status: "success",
    requestedTime: req.requestTime,
    results: Tours.length,
    data: {
      tour: Tours,
    },
  });
};

const getTourById = (req, resp) => {
  const reqID = req.params.id * 1;
  const searchedTour = Tours[reqID];

  resp.status(200).json({
    status: "success",
    data: {
      searchedTour,
    },
  });
};

const createTour = (req, resp) => {
  const newId = Tours.length;
  const newTour = Object.assign({ id: newId }, req.body);

  Tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(Tours),
    (err) => {
      resp.status(201).json({
        status: "success",
        data: {
          newTour,
        },
      });
    }
  );
};

const updateTour = (req, resp) => {
  if (req.params.id * 1 > Tours.length) {
    return resp.status(401).json({
      status: "fail",
      message: "invalid id",
    });
  }

  resp.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here ...>",
    },
  });
};

const deleteTour = (req, resp) => {
  if (req.params.id * 1 > Tours.length) {
    return resp.status(401).json({
      status: "fail",
      message: "invalid id",
    });
  }

  resp.status(201).json({
    status: "success",
    data: null,
  });
};

// ---> User controller

const getAllUsers = (req, resp) => {
  resp.status(500).json({
    status: "error",
    message: "route not implemented",
  });
};

const createUsers = (req, resp) => {
  resp.status(500).json({
    status: "error",
    message: "route not implemented",
  });
};

const getUserById = (req, resp) => {
  resp.status(500).json({
    status: "error",
    message: "route not implemented",
  });
};

const updateUser = (req, resp) => {
  resp.status(500).json({
    status: "error",
    message: "route not implemented",
  });
};

const deleteUser = (req, resp) => {
  resp.status(500).json({
    status: "error",
    message: "route not implemented",
  });
};

// 4.) Routes

// app.get("/api/v1/tours", getAllTours);

// app.get("/api/v1/tours/:id", getTourById);

// app.post("/api/v1/tours", createTour);

// app.patch("/api/v1/tours/:id", updateTour);

// app.delete("/api/v1/tours/:id", deleteTour);

// Refactored way and chaining routes

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

// ---> User Routes

userRouter.route("/").get(getAllUsers).post(createUsers);
userRouter.route("/:id").patch(updateUser).delete(deleteUser).get(getUserById);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// 5.) Server starts
app.listen(8011, () => {
  "server started on 8011";
});
