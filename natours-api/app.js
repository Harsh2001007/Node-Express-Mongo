const express = require("express");
const app = express();

app.get("/", (req, resp) => {
  resp.send("service started");
});

app.listen(8011, () => {
  "server started on 8011";
});
