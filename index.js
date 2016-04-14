var cheerio = require('cheerio');
var request = require('request');

exports.handler = function(event, context) {
  var url = 'http://texas4000.kintera.org/faf/home/default.asp?ievent=1134181';

  request(url, function(err, res, body) {
    $ = cheerio.load(body);
    var script = $('script').get()[0].children[0].data;
    var goal = parseInt(script.match(/"goal":\s+\"(.+)\"/)[1]);
    var raised = parseInt(script.match(/"raised":\s+\"(.+)\"/)[1]);

    var results = {};
    results["raised"] = raised
    results["goal"] = goal
    console.log(JSON.stringify(results, null, 4));

    context.succeed(results);
  });
}