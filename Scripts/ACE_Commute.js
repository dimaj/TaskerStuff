// get JSON from %ace_res variable in Tasker
var jsonStr = local('ace_res');

var json = JSON.parse(jsonStr);
var data = json.get_vehicles;

// update last updated time
var gen_on = new Date();
setLocal('%ace_last_update', ('0' + gen_on.getHours()).substr(-2) + ":" + ('0' + gen_on.getMinutes()).substr(-2));

// define list of stations of my interest
var fremont = 156;
var great_america = 157;

var fremontAmArr = [], fremontPmArr = [], gaAmArr = [], gaPmArr = [];

for (var i = 0; i < data.length; i++) {
  // if next stop is not specified, skip it
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
    if (minsLeft == null || minsLeft == "") {
      continue;
    }
    var arrTime = curStop.time;
    var isAm = arrTime.toLowerCase().indexOf("am") > 0;

    // add values to the appropriate arrays
    if (stopID == fremont) {
      if (isAm) {
        fremontAmArr.push(minsLeft);
      }
      else {
        fremontPmArr.push(minsLeft);
      }
    }

    else if (stopID == great_america) {
      if (isAm) {
        gaAmArr.push(minsLeft);
      }
      else {
        gaPmArr.push(minsLeft);
      }
    }
    else {
      continue;
    }
  }
}

// define a sort function to sort in ascending order
var sortFunc = function(a, b) {
  return a - b;
};

// sort arrays
gaAmArr.sort(sortFunc);
gaPmArr.sort(sortFunc);
fremontAmArr.sort(sortFunc);
fremontPmArr.sort(sortFunc);

// join first 2 elements of arrays
var fAm = fremontAmArr.slice(0, 2).join(" & ");
var fPm = fremontPmArr.slice(0, 2).join(" & ");
var gaAm = gaAmArr.slice(0, 2).join(" & ");
var gaPm = gaPmArr.slice(0, 2).join(" & ");

// if results are empty, set them to Not In Service
if (fAm == "") { fAm = "NIS"; }
if (fPm == "") { fPm = "NIS"; }
if (gaAm == "") { gaAm = "NIS"; }
if (gaPm == "") { gaPm = "NIS"; }

// set local variables
setLocal("ace_fremont_am", fAm);
setLocal("ace_fremont_pm", fPm);
setLocal("ace_ga_am", gaAm);
setLocal("ace_ga_pm", gaPm);