var request    = require("request");
var mysql      = require("mysql");
var fs         = require("fs");
var nodemailer = require("nodemailer");

function YoloSwag(){
  var conn = mysql.createConnection({
    host    : "54.70.226.170",
    user    : "root",
    password: "Fizz",
    database: "testing"
  });

  // %3A   colon
  // %2B   plus
  var startYear   = "2013";
  var startMonth  = "09";
  var startDay    = "17";
  var startHour   = "00"; // 24-hour format (00-23)
  var startMinute = "00";
  var startSecond = "00";
  var start       = `${startYear}-${startMonth}-${startDay}T${startHour}%3A${startMinute}%3A${startSecond}.000%2B0000`;

  var endYear   = "2013";
  var endMonth  = "09";
  var endDay    = "17";
  var endHour   = "23"; // 24-hour format (00-23)
  var endMinute = "59";
  var endSecond = "59";
  var end       = `${endYear}-${endMonth}-${endDay}T${endHour}%3A${endMinute}%3A${endSecond}.000%2B0000`;

  var thing = `https://apollo-mod.na.leagueoflegends.com/live.json?created_from=${start}&created_to=${end}&page_size=50&sort_direction=asc`;

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
      var obj           = JSON.parse(html);
      var searchResults = obj["searchResults"];
      var collection    = [];

      for(var i = 0; i < searchResults.length; i++){
        var thing = {};

        if("comment" in searchResults[i]){
          var obj = searchResults[i]["comment"];

          thing["post_id"]        = obj["id"];
          thing["discussion_id"]  = null;
          thing["application_id"] = null;
          thing["type"]           = "comment";
          thing["created_at"]     = obj["createdAt"];
          thing["user"]           = obj["user"]["id"];
          thing["text"]           = obj["message"];
          thing["title"]          = null;
          thing["discussion"]     = obj["discussion"]["id"];
          console.log("Comment with discussion ID:", thing["discussion"]);
        }
        else if("discussion" in searchResults[i]){
          var obj = searchResults[i]["discussion"];

          thing["post_id"]        = null;
          thing["discussion_id"]  = obj["id"];
          thing["application_id"] = obj["application"]["id"];
          thing["type"]           = "discussion";
          thing["created_at"]     = obj["createdAt"];
          thing["user"]           = obj["user"]["id"];
          thing["text"]           = obj["content"]["body"];
          thing["title"]          = obj["title"];
          thing["discussion"]     = null;
          console.log("Thread with discussion ID:", thing["discussion_id"]);
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
}

function SendEmail(){
  let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: "leif.coleman1@gmail.com",
          pass: ""
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Leif" <leif.coleman1@gmail.com>', // sender address
      to: 'mageleif@yahoo.com', // list of receivers
      subject: 'Hello', // Subject line
      text: 'Hello world ?', // plain text body
      html: '<b>Hello world ?</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
