import React, { Component } from 'react';
import BookShelfChanger from './BookShelfChanger';
import PropTypes from 'prop-types';

function Author(props) {
    return (
        <div className="book-authors">{props.author}</div>
    )
}

Author.propTypes = {
    author: PropTypes.string.isRequired
}

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onShelfUpdate: PropTypes.func.isRequired,
        shelf: PropTypes.string.isRequired,
    }

    render() {
        const { book, onShelfUpdate, shelf } = this.props
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
                    <div className="book-title">{book.title}</div>
                    {book.authors && book.authors.map((author, index) => (
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

