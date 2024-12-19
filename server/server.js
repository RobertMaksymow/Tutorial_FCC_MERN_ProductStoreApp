// const express = require('express')   old way importing
// for new way add "type": "module", in package.json

import express from "express";

const app = express();

app.listen(5000, () => {
  console.log("Server listening on port 5000!");
});
