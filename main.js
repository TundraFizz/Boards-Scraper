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
    "Cookie":           "__cfduid=d93f4a69eda8fbc3e9abe04aee82100551490060915; play_splash_count=1; PVPNET_TOKEN_NA=eyJkYXRlX3RpbWUiOjE0OTI3MDQ4NjA2NjksImdhc19hY2NvdW50X2lkIjozMzg5NzA3OCwicHZwbmV0X2FjY291bnRfaWQiOjMzODk3MDc4LCJzdW1tb25lcl9uYW1lIjoiVHVuZHJhIEZpenoiLCJ2b3VjaGluZ19rZXlfaWQiOiI5MDM0NzUyYjJiNDU2MDQ0YWU4N2YyNTk4MmRhZDA3ZCIsInNpZ25hdHVyZSI6Ik9ReDJ1NFdETE5BSFBrWVpCZXpzcWxLcmkrdmN4eUJERW5qQUYrelhPcTQvZDlJcnlZTk0yaUkrbFRVN2hhSk9qSW9hcTgybEd6dExiTGQ0RVFyaUtwZU8rcmVjYUxBdEdGTXh0YTJoaklLckpxekdFTTVaMlpOQVZiQisxN0dTbGhUQzdVT084a0x5UFM3Y1VvNmFlanRaNHRWdVowSC9kZUc0ZVI4a25aND0ifQ%3D%3D; PVPNET_ACCT_NA=Tundra+Fizz; PVPNET_ID_NA=33897078; PVPNET_REGION=na; PVPNET_LANG=en_US; id_token=eyJraWQiOiJzMSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyMGIyZmI1MC1lOTI4LTU2NmYtODdjNy02YzUyMjI5NTY4ZjkiLCJhdWQiOiJyc28td2ViLWNsaWVudC1wcm9kIiwiYWNyIjoidXJuOnJpb3Q6YnJvbnplIiwiYW1yIjpbImNvb2tpZSIsInB3ZCJdLCJpc3MiOiJodHRwczpcL1wvYXV0aC5yaW90Z2FtZXMuY29tIiwibG9sIjpbeyJ1aWQiOjMzODk3MDc4LCJjdWlkIjozMzg5NzA3OCwidW5hbWUiOiJtYWdlbGVpZiIsImNwaWQiOiJOQTEiLCJwaWQiOiJOQSJ9XSwidGFnIjpbImVudGl0bGVtZW50LmxjdS5hbHBoYSJdLCJleHAiOjE0OTI3MDU3NTksImxvY2FsZSI6ImVuX1VTIiwiaWF0IjoxNDkyNzA0ODU5fQ.BHbWT3JO8Mi3UBhAmNoa3dYC9-xXMcaty2IMoEV2DnWvTebmmDyX5_1qkLtl2dTFeV6lNtW-CrMVldR_1-0oiUXr3Mj0jMxQ_gfXPZlUEn9D075J81AFruamZGFgDd5Oi1FkPXL7k2pBDE8Aa_D2tJmo53px64L0blsxOoBGuGA; id_hint=sub%3D20b2fb50-e928-566f-87c7-6c52229568f9%26id%3D33897078%26summoner%3DTundra%2520Fizz%26region%3DNA1%26tag%3Dna%26lang%3Den; ping_session_id=6b718720-cf05-4f6e-b669-0324a7010bb3; APOLLO_TOKEN=025795876b2587bc965b53fbc4f13d119147be47; PHPSESSID=a8854gas0co738hs6nkl7e86u6; s_cc=true; s_sq=%5B%5BB%5D%5D; ajs_user_id=%22NA_33897078%22; ajs_group_id=null; s_vi=[CS]v1|2C68433A05033C60-60001184C0019E5A[CE]; _dc_gtm_UA-5859958-1=1; s_fid=373840B88405E451-0D5DDA511A150BB0; s_nr=1494614173559-Repeat; rp2=1494614173559-Repeat; _gat_UA-5859958-1=1; _ga=GA1.2.810017632.1490060917; _gid=GA1.2.252507535.1494614176; s_ppv=lol2%253Ana%253Aen%253Aapollo%2520forums%253Aen%253Acommunity-moderation%253Adaily%2520reminder%2520that%2520bronze%2520shouldn%2527t%2520post%2520on%2520boards%2C82%2C57%2C1379",
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
