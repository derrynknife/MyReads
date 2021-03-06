import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BooksGrid } from './BookShelf'
import * as BooksAPI from './BooksAPI'
import throttle from 'lodash.throttle';

class Search extends Component {
    state = {
        query : '',
        books : {},
        shelves : {}
    }

    constructor(props) {
        super(props);
        this.searchBarChangeHandler = this.searchBarChangeHandler.bind(this);
        this.handleClickThrottled = throttle(this.searchBarChangeHandler, 250);
    }

    componentWillUnmount() {
        this.handleClickThrottled.cancel();
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                let shelves = {}
                for (const book of books) {
                    shelves[book.id] = book.shelf
                }
                this.setState({
                    shelves : shelves,
                })
            })
    }

    updateBooks = (books) => {
        let booksDict = {}
        for (const book of books) {
            booksDict[book.id] = book
        }
        this.setState({
            books : booksDict
        })
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
                        let shelf = this.state.shelves[book.id];
                        if (!shelf) {
                            book.shelf = "none";
                        } else {
                            book.shelf = shelf;
                        }
                        
                    }
                    this.updateBooks(books);
                } else {
                    this.updateBooks([]);
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    onShelfUpdate = (book, shelf) => {
        let wasShelf = this.state.shelves[book.id]
        if (wasShelf === undefined) {
            wasShelf = "none"
        }
        let newState = Object.assign({}, this.state)
        newState.shelves[book.id] = shelf
        this.setState(newState)

        BooksAPI.update(book, shelf)
            .catch((error) => {
                newState.shelves[book.id] = wasShelf
                this.setState(newState)
            })
    }

    render() {
        const { query, books, shelves } = this.state
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
                        bookIDs={Object.keys(books)}
                        books={books}
                        shelves={shelves}
                        onShelfUpdate={this.onShelfUpdate}
                    />
                </div>
            </div>
        )
    }
}

export default Search

