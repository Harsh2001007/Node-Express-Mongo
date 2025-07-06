const express = require("express");

const router = express.Router();

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

router.route("/").get(getAllUsers).post(createUsers);
router.route("/:id").patch(updateUser).delete(deleteUser).get(getUserById);

module.exports = router;
