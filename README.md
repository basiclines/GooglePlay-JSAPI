Google Play Store Javascript API
================
Retrieves applications metadata from Google Play Store product detail page trought NodeJS


Why?
================
When i was working on https://github.com/meetsapp/SmartAppBanner, i thought it will be cool to have support for Android Banners also
 but i've found quite hard to get the desired metada from Google Play Store with **non-official libraries based on Python or Java**, as i don't know a bit about these languages.

That's why i've created a small **NodeJS server that exposes Google Play Store applications metadata in JSON** format that also can be accessed for any client/server side script


How?
================
Requests routed to `/app/:appid` crawls the Goole Play Store product detail page (given an appid) by DOM traversing with `cheerio`.
Then we assemble a **JSON output** by using the same syntax format as the iTunes API http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#searchexamples

The server responds to any GET request (yes, also **CORS with client-side Javascript**)


Live example
================
`http://googleplay-jsapi.herokuapp.com/app/:appid`

Where `:appid` is your application package id, i.e:

http://googleplay-jsapi.herokuapp.com/app/com.meetsapp


Running local
================
`npm install`

`node index.js` or `foreman start`


Running on Heroku (Live deploy)
================
**1/** Create project on **Heroku**

**2/** Pick the **Git URL** of the project and add it as new Git remote

`git remote add heroku git@heroku.com:project-name.git`

**3/** Push the code

`git push heroku master`

**4/** Ensure the app is running (you may need to instal Heroku CLI)

`heroku ps:scale web=1`

More info
https://devcenter.heroku.com/articles/getting-started-with-nodejs#prerequisites


Similar libraries
================
**Python:** https://github.com/androidtweak/Google-Play-REST-API/

**Java:** https://github.com/Akdeniz/google-play-crawler


To do
================
* Add new scrappers for providing access to searches or other products types
