const express = require("express"),
    slash   = require('express-slash');
const app = express();
var netcdf4 = require("netcdf4")
const port = process.env.PORT || 5000;

// Create the router using the same routing options as the app.
app.enable('strict routing');
var router = express.Router({
    caseSensitive: app.get('case sensitive routing'),
    strict       : app.get('strict routing')
});

app.use(router);
app.use(slash());

// create a GET route
router.get("/express_backend/", (req, res) => {
  console.log(req);

  let yr = req.query.yr;
  let m = req.query.m;
  let d = req.query.d;
  let x = req.query.x;
  let y = req.query.y;
  let fn = "/OLCI/" + yr + "/" + m + "/" + d + "/polymer/mosaic_output.nc";
  console.log("year: "+yr);
  console.log(fn);

  let fh = new netcdf4.File(fn, "r");
  let val = fh.root.variables['logchl'].read(x,y);

  console.log(val);

  res.set('Content-Type', 'text/html');
  res.send(val.toString());
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
