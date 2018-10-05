/* 
var fs = require("fs");
fs.readFile("movies.txt", "utf8", function(error, data) {
    
});
*/
require("dotenv").config();
var request = require('request');
//var spotifyKeys = require("./keys");
//var spotify = new Spotify(keys.spotify);

var arg = process.argv;

switch (arg[2]) {
    case "concert-this":
        request("https://rest.bandsintown.com/artists/" + arg[3] + "/events?app_id=codingbootcamp", function (error, response, body) {
            if (error) {
                return console.log('error:', error);
            }
            //console.log('statusCode:', response && response.statusCode);
            if (response.statusCode === 200) {
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
                    );
                }
            }
        });
}