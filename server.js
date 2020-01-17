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
 // console.log(req);

  let yr = req.query.yr;
  let m = req.query.m;
  let d = req.query.d;
  let y = req.query.x;
  let x = req.query.y;
  let fn = "/OLCI/" + yr + "/" + m + "/" + d + "/polymer/mosaic_output.nc";
  //console.log("year: "+yr);
  //console.log(fn);

  let fh = new netcdf4.File(fn, "r");
  let lchl = fh.root.variables['logchl'].read(x,y);
  let algae = 10**(lchl);
  let lat = fh.root.variables['lat'].read(x,y);
  let lon = fh.root.variables['lon'].read(x,y);

     console.log('xy '+x+' '+y+' lat: '+lat+' lon: '+lon+' logchl '+lchl+' algae: '+algae);


//  if (algae=1) {algae=''};
//  var i,j;
//var tmpm = Array.from(Array(11), () => new Array(11));
//var lattm = Array.from(Array(11), () => new Array(11));
//var lontm = Array.from(Array(11), () => new Array(11));
//  for (i=-5; i<6; i++) {
//    for (j=-5; j<6; j++) {
//     tmpm[i+5][j+5]=fh.root.variables['logchl'].read(parseInt(x)+i,parseInt(y)+j);
//     lattm[i+5][j+5]=fh.root.variables['lat'].read(parseInt(x)+i,parseInt(y)+j);
//     lontm[i+5][j+5]=fh.root.variables['lon'].read(parseInt(x)+i,parseInt(y)+j);
//     console.log('ij '+i+' '+j+' lat: '+lattm[i+5][j+5]+' lon: '+lontm[i+5][j+5]+' logchl '+tmpm[i+5][j+5]);

//    }
//  }

for (i=0; i<6; i++) {
//console.log(tmpm[i]);
}


   res.json({lat: lat,lon: lon,algae: algae});
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
