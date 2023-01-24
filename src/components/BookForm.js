import React, { useState } from "react";

const BookForm = (props) => {
  const { toggleForm, addBook } = props;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const [read, setRead] = useState('');

  return (
    <div className="form-popup">
      <div className="form-container">
        <form name="new-book-form">
          <h2><u>New Book</u></h2>
          <label htmlFor="title">Title</label>
          <input type="text" 
                  name="title" 
                  id="title" 
                  minLength={2} 
                  required  
                  onChange={(e) => setTitle(e.target.value)}
                  />
          <br />
          <label htmlFor="author">Author</label>
          <input type="text" 
                  name="author" 
                  id="author" 
                  minLength="2" 
                  required 
                  onChange={(e) => setAuthor(e.target.value)}
                  />
          <br />
          <label htmlFor="pages">Pages</label>
          <input type="number" 
                  name="pages"
                  id="pages"
                  min="1"
                  required
                  onChange={(e) => setPages(e.target.value)}
                  />
          <br />
          <label htmlFor="read">I have read this book</label>
          <input type="checkbox" 
                  name="read" 
                  id="read"
                  onChange={(e) => setRead(e.target.checked)} />
          <br />
          <input type="submit" 
                  value="Submit" 
                  className="form-submit" 
                  onClick={(e) => addBook(e, title, author, pages, read)} 
                  />
        </form>
        <button onClick={() => toggleForm()} className="new-cancel">Close</button>
      </div>
    </div>
  );
};

export default BookForm;