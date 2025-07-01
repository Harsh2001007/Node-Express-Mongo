const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

const Tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, resp) => {
  resp.status(200).json({
    status: "success",
    results: Tours.length,
    data: {
      tour: Tours,
    },
  });
});

app.get("/api/v1/tours/:id", (req, resp) => {
  const reqID = req.params.id * 1;
  const searchedTour = Tours[reqID];

  resp.status(200).json({
    status: "success",
    data: {
      searchedTour,
    },
  });
});

app.post("/api/v1/tours", (req, resp) => {
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
});

app.patch("/api/v1/tours/:id", (req, resp) => {
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
});

app.delete("/api/v1/tours/:id", (req, resp) => {
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
});

app.listen(8011, () => {
  "server started on 8011";
});
