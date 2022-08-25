function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  const borrowedBooks = books.forEach((book) => {
    if (!book.borrows[0].returned) {
      count++;
    }
  });
  return borrowedBooks, count;
}

function getMostCommonGenres(books) {
  const bookGenres = books.reduce((genre, book) => {
    let genreOfBook = book.genre;
    let bookInfo = genre.find((genres) =>
      genres.name === genreOfBook);
    if (!bookInfo) {
      let genreInfo = {
        name: genreOfBook,
        count: 1,
      };
      genre.push(genreInfo)
    }
    if (bookInfo) {
      bookInfo.count++
    }
    return genre;

  }, []);
  bookGenres.sort((bookA, bookB) => bookB.count - bookA.count);
  if (bookGenres.length > 5) {
    return bookGenres.slice(0, 5);
  }
  return bookGenres;
}

function getMostPopularBooks(books) {
  let mostPopular = [];

  const results = books.reduce((user, book) => {
    mostPopular.push({ name: book.title, count: book.borrows.length });
  }, [])
  return topRated(mostPopular)
}

//helper funtion to sort most popular books and return top 5

function topRated(bookList) {
  let mostPopular = bookList.sort((numberA, numberB) => (
    numberA.count < numberB.count ? 1 : -1))
  return mostPopular.slice(0, 5);
}


function getMostPopularAuthors(books, authors) {
  let topAuthors = [];

  for (let author of authors) {
    const names = `${author.name.first} ${author.name.last}`

    let amount = 0;
    for (let book of books) {
      if (book.authorId === author.id) {
        amount += book.borrows.length
      }
    }
    const authorProfile = { name: names, count: amount }
    topAuthors.push(authorProfile);
  }
  return topRated(topAuthors)
}
//let authorNames
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
