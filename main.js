var request = require("request");
var mysql   = require("mysql");
var fs      = require("fs");

var conn = mysql.createConnection({
  host    : "54.70.226.170",
  user    : "root",
  password: "Fizz",
  database: "testing"
});

var thing;
thing = "https://apollo-mod.na.leagueoflegends.com/live.json?created_from=2017-05-12T18%3A15%3A23.680%2B0000&created_to=2017-05-12T18%3A36%3A46.610%2B0000&page_size=50&sort_direction=desc";
thing = "https://apollo-mod.na.leagueoflegends.com/live.json?created_from=2013-09-17T01%3A01%3A00.000%2B0000&created_to=2013-09-17T19%3A00%3A00.000%2B0000&page_size=50&sort_direction=desc";

var data = {
  "url": thing,
  "rejectUnauthorized": false,
  "headers": {
    "Accept":           "*/*",
    "Accept-Encoding":  "gzip, deflate, sdch, br",
    "Accept-Language":  "en-US,en;q=0.8",
    "Connection":       "keep-alive",
    "Cookie":           "",
    "Host":             "apollo-mod.na.leagueoflegends.com",
    "Referer":          "https://apollo-mod.na.leagueoflegends.com/live",
    "User-Agent":       "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest"
  }
};

request(data, function(error, response, html){
  if(error){
    console.log(error);
    console.log(response["statusCode"]);
  } else {
    var obj = JSON.parse(html);
    var debug = `searchResultsCount: ${obj["searchResultsCount"]}\nresultsCount:       ${obj["resultsCount"]}`;
    console.log(debug);

    var searchResults = obj["searchResults"];
    var collection    = [];

    for(var i = 0; i < searchResults.length; i++){
      var thing = {};

      if("comment" in searchResults[i]){
        var obj = searchResults[i]["comment"];

        thing["id"]         = obj["id"];
        thing["type"]       = "comment";
        thing["created_at"] = obj["createdAt"];
        thing["user"]       = obj["user"]["id"];
        thing["text"]       = obj["message"];
        thing["title"]      = null;
        thing["discussion"] = obj["discussion"]["id"];
      }
      else if("discussion" in searchResults[i]){
        var obj = searchResults[i]["discussion"];

        thing["id"]         = obj["id"];
        thing["type"]       = "discussion";
        thing["created_at"] = obj["createdAt"];
        thing["user"]       = obj["user"]["id"];
        thing["text"]       = obj["content"]["body"];
        thing["title"]      = obj["title"];
        thing["discussion"] = null;
      }

      collection.push(thing);
    }

    // fs.writeFile("obj.json", JSON.stringify(searchResults, null, 4), function(err){});
    var queriesRemaining = collection.length;
    for(var i = 0; i < collection.length; i++){
      var sql  = `INSERT INTO scrape SET ?`;
      var args = collection[i];
      conn.query(sql, args, function(err, rows){
        if(err)
          console.log(err);
        if(--queriesRemaining == 0){
          console.log("All queries have completed");
          conn.end();
        }
      });
    }
  }
});

// "id":         // ID of the comment or discussion
// "type":       // "comment" OR "discussion"
// "createdAt":  // Timestamp when the post/thread was created
// "user":       // User
// "text":       // The "message" info from comments, or "body" info from discussion
// "title":      // Title of the thread if it's a discussion (NULL if comment)
// "discussion": // reference to the discussion ID if it's a comment (NULL if discussion)
