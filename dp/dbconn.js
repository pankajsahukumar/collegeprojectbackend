const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
      if(!err) {
        console.log("We are connected");
      }
    });