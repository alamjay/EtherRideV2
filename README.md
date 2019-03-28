# EtherRide

EtherRide is a web application using blockchain to allow a service of a peer to peer car sharing service.  

This project was built with [Create React App](https://github.com/facebook/create-react-app).

## Setup

Before running the web application, you will need the following:
    1. Ganache                      https://truffleframework.com/ganache
    2. Metamask extension           https://metamask.io/
    3. Node package Manager         https://nodejs.org/en/
    4. Truffle (if not installed)   https://truffleframework.com/
    5. Run in Linux environment

## Instruction

Once this repo has been cloned run the following:
    1. open ganache
    2. navigate to the project directory and open a command line
    2. run 'npm install'
    3. run the following commands:
        a. truffle compile
        b. truffle migrate --reset
        c. cd client/src
        d. rm -r contract (delete contract folder)
        e. cd ..
        f. npm start
    4. open browser and run http://localhost:3000

## Available Scripts

In the client directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

