//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 26.12.2017
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

//------------------------------------------------------------------------------
// Chelf changer
//------------------------------------------------------------------------------
class ShelfChanger extends Component {
  //----------------------------------------------------------------------------
  // Property types
  //----------------------------------------------------------------------------
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string.isRequired,
    moveBook: PropTypes.func.isRequired
  }

  //----------------------------------------------------------------------------
  // Render
  //----------------------------------------------------------------------------
  render() {
    return (
      <div className="book-shelf-changer">
        <select
          defaultValue='disabled'
          onChange={(event) => {
            const { book, shelf, moveBook } = this.props;
            var target = event.target.value;
            moveBook(book, shelf, target);
          }}>
          <option value="disabled" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default ShelfChanger;
