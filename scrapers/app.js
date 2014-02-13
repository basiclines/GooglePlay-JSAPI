var cheerio = require('cheerio');

module.exports = {
	parse: function(data) {

		$ = cheerio.load(data);
		var wrapper = $('.details-wrapper ');

		var r_icon = wrapper.find(".cover-image").attr("src");
		var r_name = wrapper.find(".document-title[itemprop=name]").text();
		var r_description = wrapper.find("[itemprop=description]").text();
		var r_author = wrapper.find("[itemprop=author] [itemprop=name]").text();
		var r_authorURL = wrapper.find(".meta-info .dev-link").attr("href");
		var r_price = wrapper.find(".details-actions button.price").text();

		// User amount or localized string
		if (r_price.match(/\d+/g)) {
			r_price = r_price.match(/\d+/g).join(".");
		}

		// User rating from 0/5 and reviews amount
		var r_averageUserRating = parseInt(wrapper.find(".header-star-badge .current-rating").attr("style").match(/\d+/g)[0]*5/100, 10);
		var r_userRatingCount = wrapper.find(".header-star-badge .stars-count").text().match(/\d+/g)[0];
		var r_viewUrl = "https://play.google.com/store/apps/details?id=";

		// Iterate over all screenshoots
		var r_screenshotUrls = [];
		(function() {
			wrapper.find(".full-screenshot").each(function(index, key) {
				r_screenshotUrls.push($(this).attr("src"));
			});
		})();

		// Tech metadata
		var r_supportedDevices = wrapper.find("[itemprop=operatingSystems]").text();
		var r_primaryGenreName = wrapper.find("[itemprop=genre]").text();
		var r_version = wrapper.find("[itemprop=softwareVersion]").text();
		var r_numDownloads = wrapper.find("[itemprop=numDownloads]").text();
		var r_fileSize = wrapper.find("[itemprop=fileSize]").text();

		// Same API Syntax as iTunes
		// http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#searchexamples
		return {
			icon: r_icon,
			name: r_name,
			description: r_description,
			author: r_author,
			author_url: r_authorURL,
			price: r_price,
			primaryGenreName: r_primaryGenreName,
			averageUserRating: r_averageUserRating,
			userRatingCount: r_userRatingCount,
			screenshotUrls: r_screenshotUrls,
			viewUrl: r_viewUrl,
			numDownloads: r_numDownloads,
			fileSize: r_fileSize,
			version: r_version,
			supportedDevices: r_supportedDevices
		}
	}
}
