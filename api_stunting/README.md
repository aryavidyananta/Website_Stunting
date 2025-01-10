
# API With Flask

Demonstrate how to create simple CRUD API with Flask, this repository dedicated for lecturer activities.

## Features
- Basic CRUD
- Authetication and Authorization with JWT
- Integrate with Firabase cloud messaging

Please clone this project and make sure to follow all instruction below:

## Requirements
- Python 3.7+
- Flask
- flask_jwt_extended
- flask_bcrypt
- python-dotenv
- mysql-connector-python
- Flask-Cors
- firebase-admin


## Preparation
**Import Database Dump**
- Please import the dump file db, the file located in the directory `stuff/db_library.sql`

**Import Postman Collection**
- Please import the collection in the postman, the file located in the directory `stuff/api_flask.postman_collection.json`

## Installation
### Step 1: Clone the repository
```
git clone https://github.com/firmangel8/api_flask.git
cd api_flask
```
or clone with:
```
git clone git@github.com:firmangel8/api_flask.git
cd api_flask
```

### Step 2: Installation package
- `pip install Flask`
- `pip install flask_jwt_extended`
- `pip install flask_bcrypt`
- `pip install python-dotenv`
- `pip install mysql-connector-python`
- `pip install Flask-Cors`
- `pip install firebase-admin`

## How to Run with Debugging Mode
**Run this command in the root project directory **
- `flask run --debug`