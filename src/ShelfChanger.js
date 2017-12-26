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
    moveBook: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
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
          <option value="disabled" disabled>{this.props.title}</option>
          {this.props.options.map((opt) => (
            <option
              key={Math.random().toString(36).substr(-8)}
              value={opt.value}>
              {opt.text}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default ShelfChanger;
