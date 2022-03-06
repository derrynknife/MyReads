import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BooksGrid } from './BookShelf'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
    state = {
        query : '',
        books : [],
        userBooks : {}
    }

    componentDidMount() {
        BooksAPI.getAll()
        .then((books) => {
            let booksDict = {}
            for (const book of books) {
                booksDict[book.id] = book
            }
            this.setState({
                userBooks : booksDict
            })
        })
    }

    updateBooks = (books) => {
        this.setState(() => ({
            books: books
        }))
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
    }

    searchBarChangeHandler = (query) => {
        this.updateQuery(query)

        BooksAPI.search(query)
            .then((books) => {
                if (books === undefined || 'error' in books) {
                    this.updateBooks([])
                } else if (books !== undefined) {
                    for (const book of books) {
                        let shelf = this.state.userBooks[book.id];
                        if (!shelf) {
                            shelf = "none"
                        }
                        book.shelf = shelf
                    }
                    this.updateBooks(books)
                } else {
                    this.updateBooks([])
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    onShelfUpdate = (book, shelf) => {
        let wasShelf = book.shelf
        let newState = Object.assign({}, this.state)
        book.shelf = shelf
        newState.userBooks[book.id] = book
        this.setState(newState)

        if (wasShelf === undefined) {
            wasShelf = "none"
        }

        this.setState(newState)

        BooksAPI.update(book, shelf)
        .catch((error) => {
            book.shelf = wasShelf
            newState.userBooks[book.id] = book
            this.setState(newState)
        })
    }

    render() {
        const { query } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link 
                        className="close-search"
                        to="/"
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(e) => this.searchBarChangeHandler(e.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid
                        bookIDs={Object.keys(this.state.books)}
                        books={this.state.books}
                        onShelfUpdate={this.onShelfUpdate}
                    />
                </div>
            </div>
        )
    }
}

export default Search

