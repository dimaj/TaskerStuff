// update last updated time
var gen_on = new Date();
setLocal('%ace_last_update', gen_on.getHours() + ":" + gen_on.getMinutes());

// get JSON from %rtres variable in Tasker
var json = JSON.parse(local('rtres'));
var data = json.get_vehicles;

// define list of stations of my interest
var fremont = 156;
var great_america = 157;

for (var i = 0; i < data.length; i++) {
  if (data[i].nextStopID == null) {
    continue;
  }

  // get the list of minutes
  var minsToNextStop = data[i].minutesToNextStops;
  for (var j = 0; j < minsToNextStop.length; j++) {
    var curStop = minsToNextStop[j];
    var stopID = curStop.stopID;
    
    // get mins remaining
    var minsLeft = curStop.minutes;
    var arrTime = curStop.time;
    var append = "";
    if (arrTime.toLowerCase().indexOf("am")) {
      append = "_am";
    }
    else {
      append = "_pm";
    }

    if (stopID == fremont) {
      setLocal("ace_fremont" + append, minsLeft);
    }

    else if (stopID == great_america) {
      setLocal("ace_ga" + append, minsLeft);
    }
    else {
      continue;
    }
  }
}
