// CURL
var util = require('util');
var exec = require('child_process').exec;
// request.js
module.exports = {
  getApp: function (config, response) {

    /**
    * Retrieves information given an appID
    *
    * @return Object
        * @propertie String lang
        * @propertie String appID
    */

    config.lang = (typeof config.lang == "string") ? config.lang : "en_US";

    var headers = "Accept-Language:"+config.lang;
    var base_path = "https://play.google.com/store/apps/details?id="
    var command = 'curl  -H '+headers+' -sL '+base_path+config.appID;

    // Use request instead of child_process
    // http://nodejs.org/docs/v0.5.2/api/http.html#http.request
    child = exec(command, function(error, stdout, stderr){

         if(error !== null) {
             console.log('exec error: ' + error);
         }

         var scraper = require('./scrapers/app');
         var data = scraper.parse(stdout);

        response.end(JSON.stringify(data));
    });

  }
};
