
### Register for Twilio API

Sign up <https://www.twilio.com/try-twilio>

Get the Twilio Access info

### Create .env file

	TWILIO_ACCT_SID=YOURTWILIOSID
	TWILIO_AUTH_TOKEN=YOURTWILIOTOKEN
	TWILIO_PHONE_NUMBER=+1YOURPHONENUMBER
	LITTLEBITS_DEVICEID=YOURDEVICEID
	LITTLEBITS_TOKEN=YOURTOKEN

### ADD TWILIO ACCOUNT_SID AND AUTH_ID TO HEROKU CONFIG

	heroku config:set TWILIO_ACCT_SID=YOURTWILIOSID
	heroku config:set TWILIO_AUTH_TOKEN=YOURTWILIOTOKEN
	heroku config:set TWILIO_PHONE_NUMBER=+1YOURPHONENUMBER
	heroku config:set LITTLEBITS_DEVICEID=YOURDEVICEID
	heroku config:set LITTLEBITS_TOKEN=YOURTOKEN



### Getting started w/ local development server

Download and install Heroku Toolbelt <https://toolbelt.heroku.com>, this will give you Foreman and the Heroku CLI (command line interface).

1) Download this boilerplate repo and navigate into the code directory with Terminal.

2) Run **npm install** to get all required libraries.

	npm install

3) Start server with **foreman start**.

	foreman start

Foreman reads your .env file, populates the process.env object for use in your app.


### Deploy to Heroku

1) A Git repository and Heroku app are required for this Example to work. 

	git init
	git add .
	git commit -am "init commit"



2) Create Heroku app

Log into heroku first if you haven't already (one time step)

	heroku login

Now create the heroku app you will push to

	heroku create

3) Push to heroku

	git push heroku master
