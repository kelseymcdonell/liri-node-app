require("dotenv").config();

var keys = require("./keys")

var Twitter = require('twitter');

var client = new Twitter(keys.twitter);

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var request = require('request');

var fs = require("fs");


// function defaultSpotifyThisSong() {
//     spotify.search({ type: 'track,artist,album', query: "The Sign,Ace of Base,The Sign", limit: 1 }, function(err, data) {
//         if (err) {
//           return console.log('Error occurred.' + err);
//         }
//      console.log(data.tracks.items[0].album.artists[0].name); 
//       console.log(data.tracks.items[0].name); 
//       console.log(data.tracks.items[0].preview_url); 
//       console.log(data.tracks.items[0].album.name); 
//       });
// }

var action = process.argv[2];
var value = process.argv[3];

switch(action) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
}

function myTweets() {

    var params = {screen_name: 'KelseyFantastic', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {

        for(i = 0; i < tweets.length; i++){
   
    console.log(tweets[i].text);
    console.log(tweets[i].created_at)}
    
  }
});
    
}

function spotifyThisSong() {

if( value == null){
value = "The Sign"
};


    spotify.search({ type: 'track', query: value, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred. ' + err );
        }
      console.log(data.tracks.items[0].album.artists[0].name); 
      console.log(data.tracks.items[0].name); 
      console.log(data.tracks.items[0].preview_url); 
      console.log(data.tracks.items[0].album.name); 
      });
}

function movieThis() {
    if( value == null){
        value = "Mr. Nobody"
        };

request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log(JSON.parse(body).Title);
    console.log(JSON.parse(body).Year);
    console.log("IMDB rating: " + JSON.parse(body).Ratings[0].Value);
    console.log("Rotton Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
    console.log(JSON.parse(body).Country);
    console.log(JSON.parse(body).Language);
    console.log(JSON.parse(body).Plot);
    console.log(JSON.parse(body).Actors);
  }
});
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(err,data) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
          return console.log(err);
        }
      
      var dataArray = data.split(",");
        action = dataArray[0];
        value = dataArray[1];
        switch(action) {
            case "my-tweets":
                myTweets();
                break;
        
            case "spotify-this-song":
                spotifyThisSong();
                break;
        
            case "movie-this":
                movieThis();
                break;
            case "do-what-it-says":
                doWhatItSays();
        }
        

        
      
      });
      
}