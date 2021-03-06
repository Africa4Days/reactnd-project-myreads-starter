import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Popup } from 'semantic-ui-react';

class BookShelf extends Component {

  render() {

    const { onShelfChange, books } = this.props;

    let currentlyReading = books.filter((book) => (
      book.shelf === 'currentlyReading'
    ));
    let wantToRead = books.filter((book) => (
      book.shelf === 'wantToRead'
    ));
    let read = books.filter((book) => (
      book.shelf === 'read'
    ));

    let d = new Date();

    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const n = `${weekday[d.getDay()]} ${months[d.getUTCMonth()]} ${d.getDate()}`;

    return (
      <div className="list-books">
      <p className='date'>{n}</p>
        <div className="list-books-title">
          <h1>Bookshelf</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading.map(book => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <img src={book.imageLinks.thumbnail} alt="book" className='book-cover'></img>
                          <div className="book-shelf-changer">
                          <Popup
                            trigger={
                              <select name='select' onChange={(event) => onShelfChange(book, event.target.value)} defaultValue={book.shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                                      }
                            content='Change shelves'
                            on='hover'
                            inverted
                           />
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
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {wantToRead.map(book => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <img src={book.imageLinks.thumbnail} alt="book" className='book-cover'></img>
                        <div className="book-shelf-changer">
                        <Popup
                          trigger={
                            <select name='select' onChange={(event) => onShelfChange(book, event.target.value)} defaultValue={book.shelf}>
                              <option value="none" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                                    }
                          content='Change shelves'
                          on='hover'
                          inverted
                         />
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
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {read.map(book => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <img src={book.imageLinks.thumbnail} alt="book" className='book-cover'></img>
                        <div className="book-shelf-changer">
                        <Popup
                          trigger={
                            <select name='select' onChange={(event) => onShelfChange(book, event.target.value)} defaultValue={book.shelf}>
                              <option value="none" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                                    }
                          content='Change shelf'
                          on='hover'
                          inverted
                         />
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
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
            >Add a book</Link>
        </div>
      </div>
    )}
}

export default BookShelf;
