//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 26.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import './App.css';

//------------------------------------------------------------------------------
// Search screen
//------------------------------------------------------------------------------
class SearchScreen extends Component {
  //----------------------------------------------------------------------------
  // Property types
  //----------------------------------------------------------------------------
  static propTypes = {
    moveBook: PropTypes.func.isRequired,
    shelfList: PropTypes.array.isRequired
  }

  //----------------------------------------------------------------------------
  // State
  //----------------------------------------------------------------------------
  state = {
    searchQuery: '',
    searchResults: []
  }

  //----------------------------------------------------------------------------
  // Update query
  //----------------------------------------------------------------------------
  updateQuery = (text) => {
    this.setState({ searchQuery: text });
    if(text === '') {
      this.setState({searchResults: []});
      return;
    }

    BooksAPI.search(text)
      .then((results) => {
        if(results instanceof Array)
          this.setState({searchResults: results});
        else
          this.setState({searchResults: []});
      });
  }

  //----------------------------------------------------------------------------
  // Renderer
  //----------------------------------------------------------------------------
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchQuery}
              onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <BookShelf
          key='search-shelf'
          shelfId='search-shelf'
          books={this.state.searchResults}
          moveBook={this.props.moveBook}
          shelfList={this.props.shelfList}
          />
      </div>
    );
  }
}

export default SearchScreen;
