# 12-express-sqlite

A sample sqlite project allowing saving Contact cards into a database.

steps required to create a sqlite / sequelize project:

1/  npm install --save express sequelize sqlite3

2/ edit the file config/config.json and replace it with your own configuration:
<pre>
{
    "development": {
        "dialect": "sqlite",
        "storage": "./database.sqlite3"
    },
    "test": {
        "dialect": "sqlite",
        "storage": ":memory"
    },
    "production": {
        "dialect": "sqlite",
        "storage": "./database.sqlite3"
    }
}
</pre>

3/ make sure you have the following code in your routes files where you need the Model classes:
const db = require('../models');
const User = db.user; // for example

It will create and use a SQLite database file called database.sqlite3 in the root of the project.
