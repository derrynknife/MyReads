import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
    state = {
        books : {},
        shelves : {
            "currentlyReading" : { title : "Currently Reading"},
            "wantToRead" : { title : "Want to Read"},
            "read" : { title : "Read"},
        }
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                let booksDict = {}
                for (const book of books) {
                    booksDict[book.id] = book
                }

                this.setState({
                    books : booksDict
                })
            })
    }

    updateBookShelf = (book, shelf) => {
        const wasShelf = book.shelf
        let newState = Object.assign({}, this.state)
        book.shelf = shelf
        newState.books[book.id] = book
        this.setState(newState)

        BooksAPI.update(book, shelf)
            .catch((error) => {
                book.shelf = wasShelf
                newState.books[book.id] = book
                this.setState(newState)
            })
    }

    render() {
        const { books, shelves } = this.state
        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            {Object.keys(shelves).map((key) => (
                                <BookShelf
                                    key={key}
                                    shelf={shelves[key]}
                                    bookIDs={Object.keys(books).filter(book => books[book].shelf === key)}
                                    books={this.state.books}
                                    onShelfUpdate={this.updateBookShelf}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to="/search"><button>Add a book</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default BooksApp
