PLP Bookstore MongoDB Assignment
Setup Instructions
Install MongoDB

Download and install MongoDB from the official site: https://www.mongodb.com/try/download/community

Alternatively, set up a free MongoDB Atlas cluster.

Install Node.js

Download and install Node.js from https://nodejs.org

Verify installation with:

bash
Copy
Edit
node -v
npm -v
Install MongoDB Node.js Driver

Inside your project directory, run:

bash
Copy
Edit
npm init -y
npm install mongodb
Database Setup
Start mongosh (MongoDB shell) and create the database and collection:

js
Copy
Edit
use plp_bookstore
db.createCollection("books")
Task 2: Basic CRUD Operations
Insert multiple book documents using a Node.js script (insert_books.js) or Mongo shell commands.

Example book document fields:

title (string)

author (string)

genre (string)

published_year (number)

price (number)

in_stock (boolean)

pages (number)

publisher (string)

Sample Insert Script (Node.js):
js
Copy
Edit
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function insertBooks() {
  try {
    await client.connect();
    const db = client.db('plp_bookstore');
    const books = db.collection('books');

    const sampleBooks = [
      { title: "Book 1", author: "Author A", genre: "Fiction", published_year: 2015, price: 15.99, in_stock: true, pages: 320, publisher: "Publisher X" },
      // add 9 more books here
    ];

    await books.insertMany(sampleBooks);
    console.log("Books inserted successfully");
  } finally {
    await client.close();
  }
}

insertBooks().catch(console.error);
Task 3: Advanced Queries
Find books by genre, author, or published after a year.

Use projection to show only title, author, price.

Sort results by price ascending or descending.

Use .limit() and .skip() for pagination (5 books per page).

Task 4: Aggregation Pipeline
Calculate average price of books by genre:

js
Copy
Edit
db.books.aggregate([
  { $group: { _id: "$genre", average_price: { $avg: "$price" } } }
])
Find author with the most books:

js
Copy
Edit
db.books.aggregate([
  { $group: { _id: "$author", book_count: { $sum: 1 } } },
  { $sort: { book_count: -1 } },
  { $limit: 1 }
])
Group books by publication decade and count:

js
Copy
Edit
db.books.aggregate([
  { $project: { decade: { $concat: [ { $toString: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } }, "s" ] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])
Task 5: Indexing
Create index on title for faster searches:

js
Copy
Edit
db.books.createIndex({ title: 1 })
Create compound index on author and published_year:

js
Copy
Edit
db.books.createIndex({ author: 1, published_year: -1 })
Use .explain("executionStats") to compare query performance before and after creating indexes.

