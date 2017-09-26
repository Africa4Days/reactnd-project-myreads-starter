import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import BookShelf from './BookShelf';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route
          path='/'
          exact
          component={BookShelf}
        />
        <Route
          path='/search'
          exact
          component={SearchPage}
        />
      </div>
    )
  }
}

export default BooksApp
