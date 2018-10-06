require("dotenv").config();
var Spotify = require('node-spotify-api');
var spotifyKeys = require("./keys.js");
var spotify = new Spotify(spotifyKeys.spotify);
var request = require('request');
var arg = process.argv;
var input = "";

//build input string
for (var i = 3; i < arg.length; i++) {
    if (i > 3 && i < arg.length) {
        input = input + " " + arg[i];
    }
    else {
        input += arg[i];
    }
}
//check for enough args
if (arg.length < 4) {
    return console.log("\nPlease enter a program choice and corresponding search query:\n\n> concert-this <band name here>\n> spotify-this-song <song name here>\n> movie-this <movie name here>\n> do-what-it-says");
}//end check

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
            for (var i = 0; i < data.tracks.items.length; i++) {
                var artist = data.tracks.items[i].artists[0].name;
                var trackName = data.tracks.items[i].name;
                var preview_url = data.tracks.items[i].preview_url;
                var albumName = data.tracks.items[i].album.name;
                console.log("\n----------------------------------------\n"
                    + "\nArtist: " + artist + ".\n"
                    + "Song: " + trackName + ".\n"
                    + "Preview Link: " + preview_url + ".\n"
                    + "Album: " + albumName + "."
                );//end string build
            }//end for
        });//end node-spotify-api call
        break;//end spotify-this-song
    case "movie-this":


        break;//end movie-this
    case "do-what-it-says":

        break;//end do-what-it-says
    //default:
    //  console.log("\nPlease enter a program choice and corresponding search query:\n\n> concert-this <band name here>\n> spotify-this-song <song name here>\n> movie-this <movie name here>\n> do-what-it-says");
}//end switch