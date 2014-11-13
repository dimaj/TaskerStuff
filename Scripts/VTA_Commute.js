// get JSON from a Tasker Variable
var json = JSON.parse(local('vta_res'));
var data = json.data;

// list of stations of interest
var lm_work_id = 8040452;
var lm_home_id = 8040416;
var mp_work_id = 8040512;
var mp_home_id = 8040508;

// get current time in ms
var now_date = new Date();
var now_date_ms = Date.parse(now_date);

var lmWorkArr = [], lmHomeArr = [], mpWorkArr = [], mpHomeArr = [];

// get time when response was generated at
var gen_on_ms = Date.parse(json.generated_on);
var gen_on = new Date(new Date().setTime(gen_on_ms));
setLocal('%vta_last_update', ('0' + gen_on.getHours()).substr(-2) + ":" + ('0' + gen_on.getMinutes()).substr(-2));

// iterate over stops
for (var i = 0; i < data.length; i++) {
    var arrivals = data[i].arrivals;
    var stop_id = data[i].stop_id;

    // iterate over arrivals for a given stop
    for (var j = 0; j < arrivals.length; j++) {
        var arr_date = Date.parse(arrivals[j].arrival_at);
        var min_diff = Math.floor((arr_date - now_date_ms) / 1000 / 60);

        // push current times to an appropriate array
        if (stop_id == lm_work_id) {
          lmWorkArr.push(min_diff);
        }
        else if (stop_id == lm_home_id) {
          lmHomeArr.push(min_diff);
        }
        else if (stop_id == mp_work_id) {
          mpWorkArr.push(min_diff);
        }
        else if (stop_id == mp_home_id) {
          mpHomeArr.push(min_diff);
        }
    }
}

// define a sort function (ascending order)
var sortFunc = function(a, b) {
  return a - b;
}

mpWorkArr.sort(sortFunc);
mpHomeArr.sort(sortFunc);
lmWorkArr.sort(sortFunc);
lmHomeArr.sort(sortFunc);

// join first 2 elements of arrays
var lmwork = lmWorkArr.slice(0, 2).join(" & ");
var lmhome = lmHomeArr.slice(0, 2).join(" & ");
var mpwork = mpWorkArr.slice(0, 2).join(" & ");
var mphome = mpHomeArr.slice(0, 2).join(" & ");

// if results are empty, set them to Not In Service
if (lmwork == "") { lmwork = "NIS"; }
if (lmhome == "") { lmhome = "NIS"; }
if (mpwork == "") { mpwork = "NIS"; }
if (mphome == "") { mphome = "NIS"; }

// set local variables
setLocal('lmwork', lmwork);
setLocal('lmhome', lmhome);
setLocal('mpwork', mpwork);
setLocal('mphome', mphome);
