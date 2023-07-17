# Homework Module 3.1 - Intro to MongoDB 💾
The homework is to create a MongoDB database, create collections inside the database, and insert documents into the collection.

### How I completed the homework
1. I write three JavaScript files to create the database, create the collections, and insert the documents.
2. I run the JavaScript files in the mongo shell.
3. I run the queries in the mongo shell to verify the documents were inserted correctly.

### How to run the JavaScript files
Based on documentation of MongoDB ([here](https://www.mongodb.com/docs/mongodb-shell/write-scripts/)),
we can run JavaScript files in the mongo shell using the `--file` option. The following is an example of how to run the JavaScript files in the mongo shell.
```bash
mongosh --file connect-and-insert-songs.js
mongosh --file connect-and-insert-artists.js
mongosh --file connect-and-insert-popular-songs.js
```
After running the JavaScript files, we can run the queries in the mongo shell to verify the documents were inserted correctly.