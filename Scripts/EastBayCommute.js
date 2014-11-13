var json = JSON.parse(local('rtres'));
var data = json.data;

var lm_work_id = 8040452;
var lm_home_id = 8040416;
var mp_work_id = 8040512;
var mp_home_id = 8040508;

var now_date = new Date();

var now_date_ms = Date.parse(now_date);

var gen_on_ms = Date.parse(json.generated_on);
var gen_on = new Date(new Date().setTime(gen_on_ms));
setLocal('%last_update', gen_on.getHours() + ":" + gen_on.getMinutes());

for (var i = 0; i < data.length; i++) {
    var arrivals = data[i].arrivals;
    var stop_id = data[i].stop_id;
    var cur_arr_count = 0;
    var cur_times = "";

    for (var j = 0; j < arrivals.length; j++) {
        if (cur_arr_count > 1) { break; }
        var arr_date = Date.parse(arrivals[j].arrival_at);
        var min_diff = Math.floor((arr_date - now_date_ms) / 1000 / 60);
        cur_times += min_diff + " & ";
	cur_arr_count++;
    }
    cur_times = cur_times.substring(0, cur_times.length - 3);

    if (stop_id == lm_work_id) {
      setLocal('%lmwork', cur_times);
    }
    else if (stop_id == lm_home_id) {
      setLocal('%lmhome', cur_times);
    }
    else if (stop_id == mp_work_id) {
      setLocal('%mpwork', cur_times);
    }
    else if (stop_id == mp_home_id) {
      setLocal('%mphome', cur_times);
    }
    else {
      setLocal("%parse_error", "something went wrong... stop id is: " + stop_id);
      exit(1);
    }
}
