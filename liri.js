require("dotenv").config();
var Spotify = require('node-spotify-api');
var spotifyKeys = require("./keys.js");
var spotify = new Spotify(spotifyKeys.spotify);
var request = require('request');

var arg = process.argv;
var input = "";
for (var i = 3; i < arg.length; i++) {
    if (i > 3 && i < arg.length) {
        input = input + " " + arg[i];
    }
    else {
        input += arg[i];
    }
}
console.log(input + "\n");

switch (arg[2]) {
    case "concert-this":
        request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp", function (error, response, body) {
            if (error) {
                return console.log('error:', error);
            }//end error
            if (!error && response.statusCode === 200) {
                body = JSON.parse(body);
                for (var i = 0; i < body.length; i++) {
                    var lineup = body[i].lineup;
                    var venueName = body[i].venue.name;
                    if (body[i].venue.region === "") {
                        var venueLoc = body[i].venue.city + ", " + body[i].venue.country;
                    }
                    else {
                        var venueLoc = body[i].venue.city + ", " + body[i].venue.region;
                    }
                    var venueDate = body[i].datetime;
                    console.log("\n----------------------------------------\n"
                        + "\nLineup: " + lineup + ".\n"
                        + "Venue: " + venueName + ".\n"
                        + "Location: " + venueLoc + ".\n"
                        + "Date/Time: " + venueDate + "."
                    );//end string build
                }//end for
            }//end bandintown api call
        });//end request
        break;//end concert-this
    case "spotify-this-song":
        spotify.search({ type: 'track', query: input }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            data = JSON.stringify(data);
            //console.log(data);
            //var trackInfo = data.tracks.items[0];            
            //var artist = trackInfo.artists[0].name;
            //var trackName = trackInfo.name;
            //var preview_url = trackInfo.preview_url;
            //var albumName = trackInfo.album.name;
            //console.log("Artist: " + artist + "\n" + "Song: " + trackName + "\n" + "Preview Link: " + preview_url + "\n" + "Album: " + albumName);


            var trackInfo = data.tracks.items;
            for (var i = 0; i < trackInfo.length; i++) {
                var artist = trackInfo[i].artists.name;
                var trackName = trackInfo[i].name;
                var preview_url = trackInfo[i].preview_url;
                var albumName = trackInfo[i].album.name;

                console.log("\n----------------------------------------\n"
                    + "\nArtist: " + artist + ".\n"
                    + "Song: " + trackName + ".\n"
                    + "Preview Link: " + preview_url + ".\n"
                    + "Album: " + albumName + "."
                );//end string build
            }//end for
























        });
        break;//end spotify-this-song
    case "movie-this":

        break;//end movie-this
    case "do-what-it-says":

        break;//end do-what-it-says
    default:
        console.log("Please enter a program choice and corresponding search query:\n\n> concert-this <band name here>\n> spotify-this-song <song name here>\n> movie-this <movie name here>\n> do-what-it-says");
}//end switch

