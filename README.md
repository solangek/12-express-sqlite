# 12-express-sqlite

A sample sqlite project allowing saving Contact cards into a database, using Sequelize ORM with SQLite, and Express.

1/  npm install --save express sequelize sqlite3

2/ the file config/config.json can be edited to configure the database connection. The default content is as follows:
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
const Contact = db.Contact; // for example

Execution will create and use a SQLite database file called database.sqlite3 in the root of the project.
You can view the SQLite contents using the DB Browser for SQLite tool (https://sqlitebrowser.org/) or any other SQLite tool.