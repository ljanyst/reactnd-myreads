//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 25.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import ShelfChanger from './ShelfChanger';

//------------------------------------------------------------------------------
// A book shelf
//------------------------------------------------------------------------------
class BookShelf extends Component {

  //----------------------------------------------------------------------------
  // Property types
  //----------------------------------------------------------------------------
  static propTypes = {
    shelfId: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
  }

  //----------------------------------------------------------------------------
  // Render
  //----------------------------------------------------------------------------
  render () {
    const { books, moveBook, shelfId } = this.props;
    var cn = 'bookshelf-books';
    if(shelfId === 'search-shelf')
      cn = 'search-books-results';
    return (
      <div className={cn}>
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}>
                  </div>
                  <ShelfChanger
                    bookId={book.id}
                    shelf={shelfId}
                    moveBook={moveBook}
                    />
                </div>
                <div className="book-title">{book.title}</div>
                {'authors' in book &&
                <div className="book-authors">{book.authors.join(', ')}</div>}
              </div>
            </li>
          ))}
      </ol>
    </div>
    );
  }
}

export default BookShelf;
