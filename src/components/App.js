import React, { useState, useEffect } from 'react';
import './App.css';
import BookForm from './BookForm';

import { db } from '../firebase_setup/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";

const App = () => {
  const [books, setBooks] = useState([]); 
  const [formOpen, setFormopen] = useState(false);
  
  const toggleForm = () => formOpen? setFormopen(false) : setFormopen(true);

  const deleteBook = async (id) => {
    await deleteDoc(doc(db, "books", id));
  };

  const changeRead = async (id) => {
    const bookToChange = books.filter(book => book.id === id)[0];
    const newRead = bookToChange.data.read === 'True' ? 'False' : 'True';
    const bookRef = doc(db, "books", id);
    
    await updateDoc(bookRef, { read: newRead })
  };

  const addBook = async (e, title, author, pages, read) => {
    if (!read) { read = false }
    e.preventDefault();
    const readString = read.toString()
    const capitalizeRead = readString.charAt(0).toUpperCase() + readString.slice(1);
    
    await addDoc(collection(db, "books"), {
          title: title,
          author: author,
          pages: pages,
          read: capitalizeRead
        });
    toggleForm();
  };

  useEffect(() => {
    async function fetchData() {
      const booksRef = collection(db, "books");
      const dbBooks = await getDocs(query(booksRef, orderBy('title')))
      const fetchedBooks = []
      dbBooks.forEach((doc) => {
        const bookObj = { id: doc.id, data: doc.data() }
        fetchedBooks.push(bookObj);
      });
      setBooks(fetchedBooks);
    }
    fetchData();
  }, [books])

  useEffect(() => {
    books.forEach((book) => {
      const readStatusEl = document.getElementById(`${book.id}`);
      book.data.read === 'True' ? readStatusEl.style.color = 'green' : readStatusEl.style.color = 'red';
    });
  }, [books])

  return (
    <div>
      <h1>My Library</h1>
      <div className='book-container'>
        {books.map((book) => { return (
          <div className='book' key={book.id}>
            <u>{book.data.title}</u>
            <p>Author: {book.data.author}</p>
            <p>Pages: {book.data.pages}</p>
            <p>Read?: <span id={book.id}>{book.data.read}</span></p>
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
