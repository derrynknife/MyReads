import React, { Component } from 'react'
import Book from './Book'

export class BooksGrid extends Component {
    render() {
        const { bookIDs, books } = this.props
        return (
            <ol className="books-grid">
                {bookIDs.map((book) => (
                    <Book 
                        key={book}
                        book={books[book]}
                        shelf={books[book].shelf}
                        onShelfUpdate={this.props.onShelfUpdate}
                    />
                ))}
            </ol>
        )
    }
}

class BookShelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelf.title}</h2>
                <div className="bookshelf-books">
                    <BooksGrid
                        bookIDs={this.props.bookIDs}
                        books={this.props.books}
                        onShelfUpdate={this.props.onShelfUpdate}
                    />
                </div>
            </div>
        )
    }
}

export default BookShelf

