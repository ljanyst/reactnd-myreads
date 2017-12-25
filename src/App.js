//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 25.12.2017
//------------------------------------------------------------------------------

import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route, Link } from 'react-router-dom';
import BookShelf from './BookShelf';

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
  // Renderer
  //----------------------------------------------------------------------------
  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {['currentlyReading', 'wantToRead', 'read'].map((shelf_id) => (
                  <BookShelf
                    key={shelf_id}
                    title={this.state.shelf_names[shelf_id]}
                    books={this.state.shelf_books[shelf_id]}
                    />
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
