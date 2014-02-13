// CURL
var util = require('util');
var exec = require('child_process').exec;

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

    var headerLanguage = "Accept-Language:"+config.lang;
    var headerEncoding = "Content-Type: charset=utf-8";
    var base_path = "https://play.google.com/store/apps/details?id="
    var command = 'curl  -H '+headerLanguage+' -H '+headerEncoding+' -sL '+base_path+config.appID;

    // Execute request
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
