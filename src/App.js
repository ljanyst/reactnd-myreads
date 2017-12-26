//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 25.12.2017
//------------------------------------------------------------------------------

import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route, Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import SearchScreen from './SearchScreen';

//------------------------------------------------------------------------------
// Books App
//------------------------------------------------------------------------------
class BooksApp extends React.Component {

  //----------------------------------------------------------------------------
  // The state
  //----------------------------------------------------------------------------
  state = {
    shelf_names: {
      read: 'Read',
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want To Read'
    },
    shelf_books: {
      read: [],
      currentlyReading: [],
      wantToRead: []
    }
  }

  //----------------------------------------------------------------------------
  // Mounting hook
  //----------------------------------------------------------------------------
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      var shelf_books = {
        read: [],
        currentlyReading: [],
        wantToRead: []
      };
      var i;
      for(i = 0; i < books.length; ++i)
        shelf_books[books[i].shelf].push(books[i]);
      this.setState({shelf_books});
    });
  }

  //----------------------------------------------------------------------------
  // Move book between shelves
  //----------------------------------------------------------------------------
  moveBook = (book, src, dst) => {
    if(src === dst)
      return;
    BooksAPI.update(book, dst)
      .then(() => {
        this.setState((state) => {
          var shelf_books = state.shelf_books;
          if(src in this.state.shelf_books)
            shelf_books[src] = shelf_books[src].filter((b) => b.id !== book.id);
          if(dst !== 'none')
            shelf_books[dst].push(book);
          return {shelf_books};
        });
      });
  }

  //----------------------------------------------------------------------------
  // Renderer
  //----------------------------------------------------------------------------
  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchScreen
            moveBook={this.moveBook} />
        )}/>

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {['currentlyReading', 'wantToRead', 'read'].map((shelf_id) => (
                  <div className="bookshelf"
                       key={'bs-'+shelf_id}>
                    <h2 className="bookshelf-title"
                        key={'h2-'+shelf_id}>
                      {this.state.shelf_names[shelf_id]}
                    </h2>
                    <BookShelf
                      key={shelf_id}
                      shelfId={shelf_id}
                      books={this.state.shelf_books[shelf_id]}
                      moveBook={this.moveBook}
                      changerTitle='Move to...'
                      changerOptions={[
                        {value: 'currentlyReading', text: 'Currently Reading'},
                        {value: 'wantToRead', text: 'Want to Read'},
                        {value: 'read', text: 'Read'},
                        {value: 'none', text: 'None'}
                      ]}
                      />
                  </div>
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add book</Link>
            </div>
          </div>

        )}/>
      </div>
    );
  }
}

export default BooksApp;
