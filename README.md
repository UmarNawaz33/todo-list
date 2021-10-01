<!-- ABOUT THE PROJECT -->
## About The Project
This website allows a user to create a todo list. User is able to create multiple todo lists and all the data is saved on monogb atlas server.

## Demo
https://mighty-savannah-23976.herokuapp.com/

<!-- GETTING STARTED -->
## Getting Started
To run this project first you need to setup your enviroment for nodejs. After that you need to:
* Clone this project.
* Use `npm install` command to install all the packages.
* Create `.env` file and add your project details.

#### To Run Locally
* Setup and Configure mongb locally.
* Use `mongod` command to start mongodb server using terminal.
* Use `node app.js` command to start the node server on localhost.

#### To Run on Server
* Setup and Configure mongodb atlas for your project.
* Setup and Configure server(heroku) for your app.
* Update `.env` file accordingly.
* For Deployment, follow the guidelines provided by heroku or any other server you are using.

### To Create New Todo List
To create a new todo list you just have to use `current_url/<new todo list name>`, like `https://mighty-savannah-23976.herokuapp.com/testing`.

### Built With
This application is built with the following:
* [Node JS](https://nodejs.org/en/)
* [Express JS](https://expressjs.com/)
* [MongoDb](https://www.mongodb.com/)
* [EJS](https://ejs.co/)
* HTML5
* CSS3



<!-- LICENSE -->
## License

Distributed under the MIT License. See [LICENSE](https://github.com/UmarNawaz33/todo-list/blob/main/LICENSE) for more information.

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [body-parser](https://www.npmjs.com/package/body-parser)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [lodash](https://www.npmjs.com/package/lodash)

