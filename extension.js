var express = require('express'),
  app = express();

var request = require('request');
var cheerio = require('cheerio');

module.exports = function (nodecg) {

  getCodStats();
  setInterval(getCodStats, 90000);
  var codStatsRep = nodecg.Replicant('codStatsRep');

  function getCodStats() {
    request('http://www.codcp.com/Gamer/' + nodecg.bundleConfig.codUrl, function (error, response, body) {
      if (error) throw error;

      var $ = cheerio.load(body);

      var prestige = $('#Content_lblAWPrestige').text().match(/\d+/g)[0];
      var level = $('#Content_lblCurrentLevel').text();
      var xpNeeded = $('#Content_lblXPNeeded').text();
      var kdr = Math.round(Number($('#Content_lblKDRatio').text()) * 100) / 100;
      var kills = $('#Content_lblKills').text();
      var wl = Math.round(Number($('#Content_lblWLRatio').text()) * 100) / 100;

      var stats = {
        prestige: Number(prestige),
        level: Number(level),
        xpNeeded: Number(xpNeeded),
        kdr: kdr,
        kills: kills,
        wl: wl
      };

      codStatsRep.value = stats;

    });
  }

  nodecg.mount(app);
};
