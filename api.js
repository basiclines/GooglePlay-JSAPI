var util = require('util');
var request = require('request');

module.exports = {
	/**
	* Retrieves information with a given appID
	*
	* @param Object config
		* @prop String lang
		* @prop String appID
	* @param Function callback
		* @param Object data
	*/
	getApp: function (config, callback) {
		config.lang = (typeof config.lang == "string") ? config.lang : "en_US";

		var headerLanguage = "Accept-Language:"+config.lang;
		var headerEncoding = "Content-Type: charset=utf-8";
		var basePath = "https://play.google.com/store/apps/details?id="
		var command = 'curl  -H '+headerLanguage+' -H '+headerEncoding+' -sL '+basePath+config.appID;


		request(basePath+config.appID, function (error, res, chunk) {
			if (!error && res.statusCode == 200) {
				var scraper = require('./scrapers/app');
				var data = scraper.parse(chunk);
				if (typeof callback == 'function') {
					callback(JSON.stringify(data));
				}
			}
		});
	}
};
