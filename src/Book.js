import React, { Component } from 'react'
import BookShelfChanger from './BookShelfChanger'

function Author(props) {
    return (
        <div className="book-authors">{props.author}</div>
    )
}

class Book extends Component {
    render() {
        const { book, onShelfUpdate, shelf } = this.props
        const { authors, title } = this.props.book
        const url = (this.props.book.imageLinks && 
                     this.props.book.imageLinks.thumbnail)

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" 
                             style={{ 
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${url})` 
                            }}></div>
                        <BookShelfChanger
                            onShelfUpdate={onShelfUpdate}
                            book={book}
                            value={shelf}
                        />
                    </div>
                    <div className="book-title">{title}</div>
                    {authors && authors.map((author, index) => (
                        <Author
                            key={index} 
                            author={author}
                        />
                    ))}
                </div>
            </li>
        )
    }
}

export default Book

