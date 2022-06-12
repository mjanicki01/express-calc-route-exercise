
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { defaultFunc } = require('./helpers')
  

app.get('/mean', function(req, res, next) {
  defaultFunc(req, res, "mean")
});

app.get('/mode', function(req, res, next) {
  defaultFunc(req, res, "mode")
});

app.get('/median', function(req, res, next) {
  defaultFunc(req, res, "median")
});


app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


app.listen(3000, () => {
    console.log("Server running on port 3000")
  });
  