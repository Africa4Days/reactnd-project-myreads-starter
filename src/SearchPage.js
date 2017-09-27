import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import { Input, Popup } from 'semantic-ui-react';
import * as BooksAPI from './BooksAPI';

class SearchPage extends Component {

  state = {
    foundBooks: [],
    query: ''
  }

  getBooks = (query) => {
      BooksAPI.search(query).then((books) => {
        if (query === '') {
          this.setState({ foundBooks: [], query: query.trim() })
        }
        this.setState({ foundBooks: books, query: query.trim() })
      })
  }

  getShelf = (books, id) => {
    const book = this.props.books.find((b) => (
      b.id === id
    ))
    return (book && book.shelf) ? book.shelf : 'none'
  }

  render() {
    const { foundBooks, query } = this.state;
    const { books, onShelfChange } = this.props;

    let showBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showBooks = foundBooks.filter((book) => (
        match.test(book.title)
      ))
    } else {
      showBooks = foundBooks;
    }

    return (
      <div className="search-books">
        <div className="ui fluid icon input">
          <Link
            to='/'
            className='close-search'
            >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <Input fluid icon='search' type='text' placeholder="Search by title or author" onChange={(event) => this.getBooks(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-books">
          <h1 className='query-search'>Showing <span className='book-num'>{showBooks.length}</span> results for <span className='query-string'>"{query}"</span></h1>
          <ol className="books-grid">
            {showBooks.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <img src={book.imageLinks.thumbnail} alt="book" className='book-cover'></img>
                    <div className="book-shelf-changer">
                    <Popup
                      trigger={
                        <select name='select' onChange={(event) => onShelfChange(book, event.target.value)} defaultValue={this.getShelf(books, book.id)}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                                }
                      content='Move to shelf'
                      on='hover'
                      inverted
                     />
                      <select name='select' onChange={(event) => onShelfChange(book, event.target.value)} defaultValue={this.getShelf(books, book.id)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage;
