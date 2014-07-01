
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

//require the Twilio module and create a REST client
var twilio_client = require('twilio')(process.env.TWILIO_ACCT_SID, process.env.TWILIO_AUTH_TOKEN);
var twilio = require('twilio');
var resp = twilio.TwimlResponse();

exports.index = function(req, res) {

	res.send("welcome");

}

/*
	GET /
*/
exports.send_sms = function(req, res) {
	
		
	//Send an SMS text message
	twilio_client.sendSms({

	    to:'+16467838457', // Any number Twilio can deliver to
	    from: '+14155992671', // A number you bought from Twilio and can use for outbound communication
	    body: 'word to your mother.' // body of the SMS message

	}, function(err, responseData) { //this function is executed when a response is received from Twilio

	    if (!err) { // "err" is an error received during the request, if any

	        // "responseData" is a JavaScript object containing data received from Twilio.
	        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
	        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

	        console.log(responseData.from); // outputs "+14506667788"
	        console.log(responseData.body); // outputs "word to your mother."

	    } else {

	    	console.log(err);
	    }
	});

	res.send("okok");
	// res.render('index.html', templateData);

};

exports.incoming_call = function(req, res) {
	console.log("********* INCOMING ***********");
	console.log(req.body);

	resp.say('Welcome to Acme Customer Service!').gather({
        action:'http://dwd-nodejs-twilio.herokuapp.com/incoming/digits',
        finishOnKey:'*'
    }, function(node) { //note the use of the "node" variable in the anonymous function

        //Now you can use this reference as well, if using "this" wrankles you
        node.say('Press 1 for customer service')
            .say('Press 2 for British customer service', { language:'en-gb' });

    });

	console.log(resp.toString());

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(resp.toString());
    
}

exports.incoming_digits = function(req,res) {
	console.log("!!!!");
	console.log(req.body);
	res.send("digits");
}
