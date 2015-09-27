var codStatsRep = nodecg.Replicant('codStatsRep');

codStatsRep.on('change', function(oldValue, newValue) {
  // console.log(newValue);
  console.log('myVar changed from '+ JSON.stringify(oldValue) +' to '+ JSON.stringify(newValue));
  loadStats(newValue);
});

$( document ).ready(function() {
  loadStats(codStatsRep);
});

function loadStats(stats) {
  console.log(stats);
  var max = false;
  var imgUrl = "";
  if (stats.level === 50 && stats.prestige === 30 && stats.xpNeeded === 0) {
    imgUrl = "url('./img/AWP32.png')";
    max = true;
  } else {
    imgUrl = "url('./img/AWP" + (stats.prestige + 1) + ".png')";
  }

  $('#prestige-icon').css('background-image', imgUrl);
  if (max === true) {
    $('#prestige').text('MAX').css('padding-left','15px');
  }
  else {
    $('#prestige').text(stats.prestige);
  }
  $('#level').text(stats.level);
  $('#kdr').text(stats.kdr);
  $('#kills').text(stats.kills);
  $('#wl').text(stats.wl);
}
