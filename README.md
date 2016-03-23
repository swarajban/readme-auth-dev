# readme-auth
===

A Node.js library for generating an URL that automatically logs a user in from your site to your ReadMe developer hub

[ReadMe](http://readme.io/)
 

## Install
```
$ npm install --save readme-auth-dev
```

## Usage

```
var ReadMeAuth = require('readme-auth-dev');
var MyReadMeAuth = new ReadMeAuth(projectUrl, secret);
var user = {
	email: 'owlbert@readme.io',
	name: 'Owlbert'
};
var url = MyReadMeAuth.getAuthUrl(user);
```

## API

### `new` ReadMeAuth(projectUrl, secret)
Constructs a new ReadMeAuth object that can be used to 

#### Arguments
- *projectUrl*: URL of your ReadMe project. Typically ` <your-project-name>.readme.io `
- *secret*: Found in the Project Settings tab of the ReadMe admin dashboard

If you do not specify them, `readme-auth-dev` will try to populate them from environment variables:
- `README_PROJECT_URL`
- `README_PROJECT_SECRET`

Example:
```
var ReadMeAuth = require('readme-auth-dev');
var MyReadMeAuth = new ReadMeAuth(); // loads from env
```

### ReadMeAuth.getAuthUrl(user)
Returns a URL for a currently logged in user that will automatically log the user 
in to your ReadMe hub

#### Arguments
- *user*: A JSON Object w/ two keys, `email` and `name`

Example:
```
var ReadMeAuth = require('readme-auth-dev');
var MyReadMeAuth = new ReadMeAuth(projectUrl, secret);
var user = {
	email: 'owlbert@readme.io',
	name: 'Owlbert'
};
var url = MyReadMeAuth.getAuthUrl(user);
```
