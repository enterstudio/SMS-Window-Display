
/**
 * Module dependencies.
 */

var express = require('express'),
  http = require('http'),
  request = require('request'),
  bodyParser = require('body-parser'),
  twilio_client = require('twilio')(process.env.TWILIO_ACCT_SID, process.env.TWILIO_AUTH_TOKEN);

// the ExpressJS App
var app = express();

// some twilio variables
var twilio_data = {}; // for debugging - will hold the latest sms received from twilio
var twilio_phone_number = process.env.TWILIO_PHONE_NUMBER; // your twilio phone # stored in environment variables (or hardcoded)

// configuration of port, templates (/views), static files (/public)
// and other expressjs settings for the web server.

// parse application/json
app.use(bodyParser.urlencoded());
app.set('port', process.env.PORT || 5000);

// app.configure(function(){

  // server port number
  
  // app.use(express.bodyParser());
  // app.use(express.methodOverride());
  // app.use(app.router);
  
// });

// ROUTES
app.get('/', function (req, res) {
  res.send("welcome");
});


app.post('/incoming_sms', function (req, res) {

  twilio_data = req.body;
  console.log(req.body);
  console.log(typeof(req.body));
  res.send('OKTHANKS'); // send response back to twilio

  // ping little bits
  var littleBitsCloudDataBody = {
    deviceId: process.env.LITTLEBITS_DEVICEID,
    token: process.env.LITTLEBITS_TOKEN,
    percent: 100, 
    duration_ms: 2000
  };

  pingLittleBits(littleBitsCloudDataBody, function (err, body) {
    console.log('little bits: ' + body);
  });

  // SMS reply
  if (twilio_data && twilio_data.hasOwnProperty('From')) {
    var message = 'Hey there!';
    twilio_send_sms(twilio_data, message, function (err, result) {

      if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(result.from); // outputs "+14506667788"
        console.log(result.body); // outputs "word to your mother."

      } else {
        console.log(err);
      }
    });
  } else {
    console.log('no twilio data');
    console.log(twilio_data);
  }

});

app.get('/debug', function (req, res) {
  
  // display the last sms received from Twilio
  res.json(twilio_data);
});


var twilio_send_sms = function (twilio_data, message, callback) {
    //Send an SMS text message
  twilio_client.sendSms({

    to: '+1' + twilio_data.From, // Any number Twilio can deliver to
    from: twilio_phone_number, // A number you bought from Twilio and can use for outbound communication
    body: message // body of the SMS message

  }, callback);
};

var pingLittleBits = function (littlebitsData, callback) {
  var options = {
    url: 'http://api-http.littlebitscloud.cc/v2/devices/' + littlebitsData.deviceId + '/output',
    method: 'POST',
    headers : {
      'Authorization' : 'Bearer ' + littlebitsData.token
    },
    json: true,
    body: {"percent":littlebitsData.percent, "duration_ms": littlebitsData.duration_ms}
  };

  request(options, function (err, response, body) {
    callback(err, body);
  });
};


// create NodeJS HTTP server using 'app'
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});













