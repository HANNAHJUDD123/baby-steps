# baby-steps
An app to track a childs life events

# setup
## database

## sequelize
create the folowing file config/config.json and place this in the file: 
``` 
{
  "development": {
    "username": "root",
    "password": "password",
    "database": "baby_steps",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
