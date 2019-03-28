# EtherRide

EtherRide is a web application using blockchain to allow a service of a peer to peer car sharing service.  

This project was built with [Create React App](https://github.com/facebook/create-react-app).

## Setup

Before running the web application, you will need the following: <br>
       1. Ganache                      https://truffleframework.com/ganache <br>
       2. Metamask extension           https://metamask.io/ <br>
       3. Node package Manager         https://nodejs.org/en/ <br>
       4. Truffle (if not installed)   https://truffleframework.com/ <br>
       5. Run in Linux environment <br>

## Instruction

Once this repo has been cloned run the following: <br>
       1. open ganache <br>
       2. navigate to the project directory and open a command line <br>
       3. run 'npm install' <br>
       4. run the following commands: <br>
              a. truffle compile <br>
              b. truffle migrate --reset <br>
              c. cd client/src <br>
              d. rm -r contract (delete contract folder) <br>
              e. cd .. <br>
              f. npm start <br>
       5. open browser and run http://localhost:3000 <br>

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

