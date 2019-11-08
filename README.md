


[![Build Status](https://travis-ci.org/murera/my-diary.svg?branch=develop)](https://travis-ci.org/murera/my-diary) [![Coverage Status](https://coveralls.io/repos/github/murera/my-diary/badge.svg?branch=develop)](https://coveralls.io/github/murera/my-diary?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/a86db2b9e80d55d5b39d/maintainability)](https://codeclimate.com/github/murera/my-diary/maintainability)

# My-Diary

MyDiary is an online journal where users can pen down their thoughts and feelings.

Here is UI template for this project on github  [link](https://murera.github.io/my-diary/UI)

#### Here is a list of all API Endpoints that you will find:

| HTTP Method | Endpoint                      | Description                                     |
| :---------- | :-------------------------    | :---------------------------------------------- |
| POST        | /api/v2/auth/signup           | User can create an account                      |
| POST        | /api/v2/auth/signin           | User can sign in                                |
| POST        | /api/v2/entries               | User can add an entry in diary                  |
| PATCH       | /api/v2//entries/<:entry-id:> | user can modify entry in diary                  |
| GET         | /api/v2/entries               | User can get all entries in his/her diary       |
| GET         | /api//v2/entries/<:entry-id:> | User can get specific entry in his/her diary    |
| DELETE      | /api//v2/entries/<:entry-id:> | User can delete specific entry in his/her diary |                                                                   



# Technology Tools used
* Server-side Framework: **Node/Express JS**
* Linting Library: **ESlint**
* Style Guide: **Airbnb**
* Testing Framework: **Mocha** with **Chai**
* Documentation Tools: **Swagger**

# Additional Tools
* JavaScript Es6 with **Babel** transpiler
* TravisCI for Continous Integration
* nyc for test coverage
* CodeClimate and Coveralls for badges
* Heroku for Deployment

The url of the app on heroku is this one [https://freeonlinediary.herokuapp.com/](https://freeonlinediary.herokuapp.com/).


This is the list of all routes as on the **heroku deployment**:

* sign up [https://freeonlinediary.herokuapp.com/api/v2/auth/signup](https://freeonlinediary.herokuapp.com/api/v2/auth/signup)
* sign in [https://freeonlinediary.herokuapp.com/api/v2/auth/signin](https://freeonlinediary.herokuapp.com/api/v2/auth/signin)
* create session [https://freeonlinediary.herokuapp.com/api/v2/entries](https://freeonlinediary.herokuapp.com/api/v2/entries)
* get all entries[https://freeonlinediary.herokuapp.com/api/v2/entries](https://free-mentorship.herokuapp.com/api/v2/entries)
* specific entry[https://freeonlinediary.herokuapp.com/api/v2/entries/<:entry-id:>](https://freeonlinediary.herokuapp.com/api/v2/entries/<:entry-id:>)
* delete an entry [https://freeonlinediary.herokuapp.com/api/v2/entries/<:entry-id:>](https://freeonlinediary.herokuapp.com/api/v1/entry/<:user-id:>)
* update an entry [https://freeonlinediary.herokuapp.com/api/v2/entries/<:entry-id:>](https://freeonlinediary.herokuapp.com/api/v2/entry/<:user-id:>)

For a better test you will need to use [POSTMAN](https://www.getpostman.com/)

# Setup Instruction
* Install [git](https://git-scm.com/downloads)
* Install [Node js](https://nodejs.org/en/)

For getting the files into your local machine open git bash and do git clone with repository url

```
$ git clone https://github.com/murera/my-diary.git
```
Navigate to the folder containing all code files by typing cd folder_name

```
$ cd my-diary
```
Install dependincies as they appear in package.json file by

```
$ npm install
```
To start the server do

```
$ npm run dev-start
```
To run the test do

```
$ npm run test
```


## Author

[Amani MURERA](https://murera.github.io/my-diay/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for more details

## Acknowledgments

* [Andela Kigali](https://andela.com/)
