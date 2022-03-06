import React, { Component } from 'react'
import Book from './Book'

export class BooksGrid extends Component {
    render() {
        const { bookIDs, books, shelves } = this.props;
        return (
            <ol className="books-grid">
                {bookIDs.map((bookID) => {
                    let shelf = shelves[bookID]
                    if (!shelf) {
                        shelf = "none"
                    }
                    return (
                    <Book 
                        key={bookID}
                        book={books[bookID]}
                        shelf={shelf}
                        onShelfUpdate={this.props.onShelfUpdate}
                    />
                )})}
            </ol>
        )
    }
}

class BookShelf extends Component {
    render() {
        const { books, onShelfUpdate, bookIDs } = this.props
        const { title } = this.props.shelf
        let shelves = {};
        for (const bookID of bookIDs) {
            shelves[bookID] = books[bookID].shelf
        }

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <BooksGrid
                        bookIDs={bookIDs}
                        books={books}
                        shelves={shelves}
                        onShelfUpdate={onShelfUpdate}
                    />
                </div>
            </div>
        )
    }
}

export default BookShelf

