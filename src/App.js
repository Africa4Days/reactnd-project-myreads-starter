import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import BookShelf from './BookShelf';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {

componentDidMount() {
  BooksAPI.getAll().then((books) => (
    this.setState({ books })
  ))
}

  state = {
    books: [],
  }

  onShelfChange = (bookToMove, toShelf) => {
    BooksAPI.update(bookToMove, toShelf).then(() => (
      this.setState((prevState) => {
        const fromShelf = bookToMove.shelf;
        let updatedBooks = null;

        if (toShelf === 'none') {
          // removing a book from a shelf
          updatedBooks = prevState.books.filter((book) => (
            book.id !== bookToMove.id
          ))
        } else if (fromShelf === 'none') {
          // adding a book to a shelf
          const updatedBook = { ...bookToMove, shelf: toShelf }
          updatedBooks = [...prevState.books, updatedBook]
        } else {
          // moving a book from one shelf to another
          updatedBooks = prevState.books.map((book) => {
            const updatedBook = book;

            if (book.id === bookToMove.id) {
              updatedBook.shelf = toShelf
            }
            return updatedBook;
          })
        }
        return { ...prevState, books: updatedBooks }
      })
    ))
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
          component={SearchPage}
        />
      </div>
    )
  }
}

export default BooksApp
