const { findAccountById } = require("./accounts");

//function to find authors by their id's
function findAuthorById(authors, id) {
  const findAuthor = authors.find((author) => author.id == id)
  return findAuthor;
}

//function to locate books by their id's
function findBookById(books, id) {
  const findBook = books.find((book) => book.id == id)
  return findBook;
}

//function to divide borrowed books into returned and unreturned
function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter((book) => !book.borrows[0].returned);
  const returned = books.filter((book) => book.borrows[0].returned);
  return [borrowed, returned];
}
//function to locate all book borrowers with their information
function getBorrowersForBook(book, accounts) {
  const borrowedBook = book.borrows;

  const borrowers = borrowedBook.map(({ id, returned }) => {
    const account = findAccountById(accounts, id)
    let newOrders = {
      returned,
      ...account,
      ...borrowedBook,
    }
    return newOrders
  })
    .slice(0, 10);
  return borrowers
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
