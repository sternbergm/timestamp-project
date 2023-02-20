// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  var date;
  if (!req.params.date) {
    date = new Date(parseInt(Date.now()));
  }
  else if (req.params.date.includes("-")) {
    date = new Date(req.params.date);
  }
  else {
    date = new Date(parseInt(req.params.date));
  }

  if(isNaN(date)){
    res.json({"error": "Invalid Date"});
  }else {
    var unixTS = Math.floor(date.getTime());
    date = date.toGMTString();
    res.json({"unix": unixTS, "utc": date});
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
