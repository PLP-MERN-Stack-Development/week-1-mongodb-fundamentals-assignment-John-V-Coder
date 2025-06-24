// Example Queries for Books Collection

// 1. Find all books in stock
const findInStockBooks = {
  in_stock: true
};

// 2. Find all books by 'Alice Green'
const findBooksByAliceGreen = {
  author: "Alice Green"
};

// 3. Find Fantasy books published after 2018
const findRecentFantasyBooks = {
  genre: "Fantasy",
  published_year: { $gt: 2018 }
};

// 4. Find all books priced between 1000 and 1600 inclusive
const findBooksInPriceRange = {
  price: { $gte: 1000, $lte: 1600 }
};

// 5. Find all books by 'John Smith' that are out of stock
const findOutOfStockJohnSmithBooks = {
  author: "John Smith",
  in_stock: false
};

// 6. Count total number of Technology books
const countTechnologyBooks = [
  { $match: { genre: "Technology" } },
  { $count: "totalTechnologyBooks" }
];

// 7. Get unique publishers list
const getUniquePublishers = {
  distinct: "publisher"
};

// 8. Find Science Fiction books sorted by price descending
const findSciFiSortedByPrice = {
  filter: { genre: "Science Fiction" },
  sort: { price: -1 }
};

// 9. Find books with more than 300 pages and price below 1500
const findBigCheapBooks = {
  pages: { $gt: 300 },
  price: { $lt: 1500 }
};

// 10. Aggregate average price of all books per genre
const avgPricePerGenre = [
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
];

module.exports = {
  findInStockBooks,
  findBooksByAliceGreen,
  findRecentFantasyBooks,
  findBooksInPriceRange,
  findOutOfStockJohnSmithBooks,
  countTechnologyBooks,
  getUniquePublishers,
  findSciFiSortedByPrice,
  findBigCheapBooks,
  avgPricePerGenre
};
