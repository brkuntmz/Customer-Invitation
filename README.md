# Customer-invitation
Finding customers to invite within 100km distance of Dublin (default destination) via [great circle distance](https://en.wikipedia.org/wiki/Great-circle_distance)


## Getting Started
The project is written in NodeJS, and you need to have [NodeJS](https://nodejs.org/en/) runtime in your machine to run the code

After downloading the runtime, to install the deps and testing the code via mocha and chai:
 `npm install`
 
## Important Requirements
The code was tested with the node version `14.13.0`, and es6 module system was utilized with `imports` instead of commonjs `require`.

- For node version >= v13 you don't have to do anything besides from running the code: `node index.js`

- For older versions of the node (i.e. v8 - v12), you have to change the extension of the files from `.js` to `.mjs`

  Also you need to run the code with the experimental flag: `node --experimental-modules index.mjs`
  
## Testing
To test the code, simply run: `npm test`
  
