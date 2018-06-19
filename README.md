# Statisfy

A Spotify music analyzer. Charts and graphs a user's listening habits and musical preferences by using the spotify web api: 

https://developer.spotify.com/documentation/

## Getting Started

Before running the app, you'll need an env file setup with the following variables: 

```
HOST=localhost
CLIENT_ID= a spotify application client ID
CLIENT_SECRET= a spotify application client secret
RESPONSE_TYPE=code
SCOPE='user-read-private user-read-email user-top-read'
REDIRECT_URI='https://url-of-your-chosen-site.com/callback'
REDIRECT_URI_DEV='http://localhost:3000/callback'
```

For creating a spotify app, you need to register one at the following url with a spotify account : 

https://developer.spotify.com/dashboard/

## Running

Use the following command for running/developing locally: 

```npm run start:dev``` 

## Unit tests

Tests are stored in the tests folder. They can be ran using the following options: 

- Run back end tests - ```npm run test:back```
- Run front end tests - ```npm run test:front```
- Run common tests - ```npm run test:common``` - this is for react apps
- Run all tests - ```npm run test:all``` 

## Built With

* React
* React Hot Loader 
* Webpack 4
* Webpack Hot Middleware
* Webpack Dev Middleware
* Webpack Hot Server Middleware
* Node
* JSS
* Material UI
* Express
* Mocha
* Chai
* Enzyme 
* Sinon
* Istanbul

## Notes/Current Issues

* The charts, pie and polar react apps need to be moved into the  respective results page folder. This will require a large refactoring due to the sheer number of files in our test folder that test these modules.

* The invalid user middleware repeats code from the results middleware. Ideally this should be a single reusable function 

* The unit tests for our statistics api folder on the server only tests the expected behaviour i.e. just the final result against a data fixture. Consequently, there's multiple functions/files for the stats generation that have no real test coverage

* Remove unused font sizes once remaining styling is complete.

* Cosmetic - the css used for scroll containers for the charts is fixed in size. If a user has less than 50 results for a specific time period, then there's a lot of empty space left that can still be scrolled.

* The application was built in a windows environment, so mac osx/linux may have platform specific issues for running the project.