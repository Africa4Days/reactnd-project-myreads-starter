import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import BookShelf from './BookShelf';
import SearchPage from './SearchPage';

class BooksApp extends Component {

componentDidMount() {
  BooksAPI.getAll().then((books) => (
    this.setState({ books })
  ))
}

  state = {
    books: [],
  }

  onShelfChange = (bookToMove, toShelf) => {
    BooksAPI.update(bookToMove, toShelf).then(() => {
      bookToMove.shelf = toShelf;

      let updatedBooks = this.state.books.filter((book) => (
        book.id !== bookToMove.id
      ))
      
      updatedBooks.push(bookToMove);
      this.setState({ books: updatedBooks })
    })
  }

  render() {

    return (
      <div className="app">
        <Route
          path='/'
          exact
          render={(props) => (
            <BookShelf
            books={this.state.books}
            onShelfChange={this.onShelfChange}
            />
          )}
        />
        <Route
          path='/search'
          exact
          render={(props) => (
            <SearchPage
            books={this.state.books}
            onShelfChange={this.onShelfChange}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
