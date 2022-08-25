//function to find accounts by their id's
function findAccountById(accounts, id) {
  const findAccount = accounts.find((account) => account.id == id)
  return findAccount;
}



// list of accounts in order of last names
function sortAccountsByLastName(accounts) {
  let names = accounts.sort((accountA, accountB) => (
    accountA.name.last > accountB.name.last ? 1 : -1))
  return names;
}



// the total number of borrowed books by accounts
function getTotalNumberOfBorrows(account, books) {
  let booksFound = 0;

  let borrowedBook = books.forEach((book) => {
    if (book.borrows) {
      book.borrows.forEach((accNumb) => {
        if (accNumb.id === account.id) {
          booksFound++;
        }
      });
    }
  });
  return booksFound;
}



// accounts with books borrowed 
function getBooksPossessedByAccount(account, books, authors) {
  const booksBorrowed = [];

  books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if (borrow.id === account.id) {
        if (!borrow.returned) {
          booksBorrowed.push(book);
        }
      }
    });
  });


  const accounts = booksBorrowed.map((book) => {
    return { ...book, author: authorObjct(book, authors) };
  });
  return accounts;
}

// a function that returns the authorObjct

function authorObjct(book, authors) {
  let author = authors.find((author) => (
    author.id === book.authorId
  ));
  return author;
}




module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};


