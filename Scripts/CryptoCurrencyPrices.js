var json = JSON.parse(local('btce_json'));
var btc = json.btc_usd;
var ltc = json.ltc_btc;
var ftc = json.ftc_btc;

// Get BTC Values
var btcBuy = btc.buy;
var btcSell = btc.sell;
var btcUpdate = new Date(new Date().setTime(btc.updated * 1000));
btcUpdate = ('0' + btcUpdate.getHours()).substr(-2) + ":" + ('0' + btcUpdate.getMinutes()).substr(-2);

// Get LTC Values
var ltcBuy = ltc.buy * btcBuy;
var ltcSell = ltc.sell * btcSell;
var ltcUpdate = new Date(new Date().setTime(ltc.updated * 1000));
ltcUpdate = ('0' + ltcUpdate.getHours()).substr(-2) + ":" + ('0' + ltcUpdate.getMinutes()).substr(-2);

// Get FTC Values
var ftcBuy = ftc.buy * btcBuy;
var ftcSell = ftc.sell * btcSell;
var ftcUpdate = new Date(new Date().setTime(ftc.updated * 1000));
ftcUpdate = ('0' + ftcUpdate.getHours()).substr(-2) + ":" + ('0' + ftcUpdate.getMinutes()).substr(-2);

// save BTC values
setLocal('btc_buy', Math.round(btcBuy * 100) / 100);
setLocal('btc_sell', Math.round(btcSell * 100) / 100);
setLocal('btc_updated', btcUpdate);

// save LTC values
setLocal('ltc_buy', Math.round(ltcBuy * 100) / 100);
setLocal('ltc_sell', Math.round(ltcSell * 100) / 100);
setLocal('ltc_updated', ltcUpdate);

// save FTC values
setLocal('ftc_buy', Math.round(ftcBuy * 100) / 100);
setLocal('ftc_sell', Math.round(ftcSell * 100) / 100);
setLocal('ftc_updated', ftcUpdate);
