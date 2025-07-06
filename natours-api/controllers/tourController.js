const fs = require("fs");

const Tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, resp) => {
  resp.status(200).json({
    status: "success",
    requestedTime: req.requestTime,
    results: Tours.length,
    data: {
      tour: Tours,
    },
  });
};

exports.getTourById = (req, resp) => {
  const reqID = req.params.id * 1;
  const searchedTour = Tours[reqID];

  resp.status(200).json({
    status: "success",
    data: {
      searchedTour,
    },
  });
};

exports.createTour = (req, resp) => {
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

exports.updateTour = (req, resp) => {
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

exports.deleteTour = (req, resp) => {
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
