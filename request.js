// CURL
var util = require('util');
var exec = require('child_process').exec;
var cheerio = require('cheerio');

// request.js
module.exports = {
  getContent: function (appID, response) {

    var lang = "en_US";
    var headers = "Accept-Language:"+lang;
    var base_path = "https://play.google.com/store/apps/details?id="
    var command = 'curl  -H '+headers+' -sL '+base_path+appID;

    // Use request instead of child_process
    // http://nodejs.org/docs/v0.5.2/api/http.html#http.request
    child = exec(command, function(error, stdout, stderr){

         if(error !== null) {
             console.log('exec error: ' + error);
         }

        $ = cheerio.load(stdout);
        var wrapper = $('.details-wrapper ');
        var r_title = wrapper.find(".document-title").text();
        var r_image = wrapper.find(".cover-image").attr("src");
        var r_price = wrapper.find(".details-actions button.price").text();

        // User amount or localized string
        if (r_price.match(/\d+/g)) {
            r_price = r_price.match(/\d+/g).join(".");
        }

        // User rating from 0/5 and reviews amount
        var r_averageUserRating = parseInt(wrapper.find(".header-star-badge .current-rating").attr("style").match(/\d+/g)[0]*5/100, 10);
        var r_userRatingCount = wrapper.find(".header-star-badge .stars-count").text().match(/\d+/g)[0];
        var r_viewUrl = "https://play.google.com/store/apps/details?id="+appID;

        // Iterate over all screenshoots
        var r_screenshotUrls = [];
        (function() {
            wrapper.find(".full-screenshot").each(function(index, key) {
                r_screenshotUrls.push($(this).attr("src"));
            });
        })();

        // Beta properties (to be improved)
        var r_supportedDevices = wrapper.find(".details-section.metadata [itemprop=operatingSystems]").text();
        var r_primaryGenreName = wrapper.find(".document-subtitle.category [itemprop=genre]").text();
        var r_version = wrapper.find(".details-section.metadata [itemprop=softwareVersion]").text();


        // API Syntax same as itunes
        // http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#searchexamples
         var data =  {
                icon: r_image,
                name: r_title,
                description: "",
                author: "",
                author_url: "",
                price: r_price,
                primaryGenreName: r_primaryGenreName,
                averageUserRating: r_averageUserRating,
                userRatingCount: r_userRatingCount,
                screenshotUrls: r_screenshotUrls,
                viewUrl: r_viewUrl,
                numDownloads: "",
                fileSize: "",
                version: r_version,
                supportedDevices: r_supportedDevices
         }


        response.end(JSON.stringify(data));
    });

  }
};
