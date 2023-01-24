import React, { useState, useEffect } from 'react';
import './App.css';
import BookForm from './BookForm';

let bookId = 3

function App() {
  const [books, setBooks] = useState([]);
  const [formOpen, setFormopen] = useState(false);

  const toggleForm = () => formOpen? setFormopen(false) : setFormopen(true);

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const changeRead = (id) => {
    const bookToChange = books.filter(book => book.id === id)[0];
    console.log(bookToChange)
    const newRead = bookToChange.read === 'True' ? 'False' : 'True';
    console.log(newRead)
    const updatedBook = { id: bookToChange.id,
                          title: bookToChange.title,
                          author: bookToChange.author,
                          pages: bookToChange.pages,
                          read: newRead
                        }
    setBooks(books.filter(book => book.id !== id).concat(updatedBook).sort((a,b) => a.id - b.id));
  };

  const addBook = (e, title, author, pages, read) => {
    if (!read) { read = false }
    e.preventDefault();
    const readString = read.toString()
    const capitalizeRead = readString.charAt(0).toUpperCase() + readString.slice(1);
    
    setBooks([...books, { id: bookId,
                          title: title,
                          author: author,
                          pages: pages,
                          read: capitalizeRead 
                        }]);
    toggleForm();
    bookId += 1
  };

  useEffect(() => {
    const book1 = { id: 1,
                    title: 'The Hobbit',
                    author: 'J.R.R Tolkein',
                    pages: 295,
                    read: 'True'
                  };
    const book2 = { id: 2,
                    title: 'Moby Dick',
                    author: 'Herman Melville',
                    pages: 378,
                    read: 'False'
                };
    setBooks(books.concat(book1).concat(book2))
  }, [])

  useEffect(() => {
    books.forEach((book) => {
      const readStatusEl = document.getElementById(`${book.id}`);
      console.log(readStatusEl)
      book.read === 'True' ? readStatusEl.style.color = 'green' : readStatusEl.style.color = 'red';
    });
  }, [books])

  return (
    <div>
      <h1>My Library</h1>
      <div className='book-container'>
        {books.map((book) => { return (
          <div className='book' key={book.id}>
            <u>{book.title}</u>
            <p>Author: {book.author}</p>
            <p>Pages: {book.pages}</p>
            <p>Read?: <span id={book.id}>{book.read}</span></p>
            <button onClick={() => changeRead(book.id)}>Change Read Status</button>
            <br /><br />
            <button onClick={() => deleteBook(book.id)}>Remove Book</button>
          </div>)
        })}
      </div>
      <button onClick={() => toggleForm()} className='new-open'>Add New Book</button>
      {formOpen && 
        <div>
          <div className='overlay'></div>
          <BookForm toggleForm={toggleForm} addBook={addBook} />
        </div>
      }
    </div>
  );
}

export default App;
