var cheerio = require('cheerio');

module.exports = {
	/**
	* Parses the given html to scrap the desired metadata
	*
	* @param String data
	* @return Object
		@prop Integer total
		@prop Array items
	*/
	parse: function(data) {

		$ = cheerio.load(data);
		var card_list = $('.card-list');
		var items = [];
		card_list.find('.card').each(function() {
			var card = {};
			var card_data = $(this);
			card['cover-image'] = card_data.find('img.cover-image').attr('src');
			card['click-target'] = card_data.find('.card-click-target').attr('src');
			card['name'] = card_data.find('.details .title').attr('title');
			card['url'] = 'https://play.google.com' + card_data.find('.details .title').attr('href');
			card['company'] = card_data.find('.details .subtitle').attr('title');
			card['html_description'] = card_data.find('.details .description').text();
			card['rating'] = card_data.find('.tiny-star').attr('aria-label');
			card['price'] = card_data.find('.price-container .display-price').text();

			items.push(card);
		});

		var result = {
			total: items.length,
			items: items
		};

		return result;
	}
}
