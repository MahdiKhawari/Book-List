//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() {}

//add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  // create tr element
  const row = document.createElement("tr");
  //insert cols
  row.innerHTML = ` 
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
};

//local storage
function Store() {}

//get books from local storage
Store.prototype.getBooks = function () {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  return books;
};

//display books from ls
Store.prototype.displayBooks = function () {
  const store = new Store();

  const books = store.getBooks();

  books.forEach((book) => {
    const list = document.getElementById("book-list");
    // create tr element
    const row = document.createElement("tr");
    //insert cols
    row.innerHTML = ` 
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
    list.appendChild(row);
  });
};

//add book to local storage
Store.prototype.addBooks = function (book) {
  const store = new Store();

  const books = store.getBooks();

  books.push(book);

  localStorage.setItem("books", JSON.stringify(books));
};

Store.prototype.removeBook = function(isbn) {
console.log(isbn)
  const store = new Store();

  const books = store.getBooks();

  books.forEach((book, index) => {
    if(book.isbn = isbn) {
      books.splice(index, 1);
    }
  })

  localStorage.setItem('books', JSON.stringify(books))
}



//show alert
UI.prototype.showAlert = function (message, className) {
  //create div
  const div = document.createElement("div");
  // add className
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const container = document.querySelector(".container");
  //get form
  const form = document.querySelector("#book-form");
  //insert alert
  container.insertBefore(div, form);

  setTimeout(function () {
    div.remove();
    // or
    //document.querySelector('.alert').remove();
  }, 3000);
};

//clear fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};


// event listener for loading the dom 
document.addEventListener('DOMContentLoaded', function () {
  const store = new Store();

  store.displayBooks();
})





//Event listener for adding book
document.getElementById("book-form").addEventListener("submit", function (e) {
  //get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  //instantiate book
  const book = new Book(title, author, isbn);

  //instantiate UI
  const ui = new UI();

  // instantiate Store
  const store = new Store();

  //validate
  if (title === "" || author === "" || isbn === "") {
    //Error alert
    ui.showAlert("please fill in all fields", "error");
  } else {
    //add book to list
    ui.addBookToList(book);

    //add book to ls
    store.addBooks(book);

    //show success
    ui.showAlert("Book added", "success");

    //clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

//event listener for delete
document.querySelector("#book-list").addEventListener("click", function (e) {
  //instantiate UI
  const ui = new UI();
  const store = new Store();

  ui.deleteBook(e.target);

  store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert("Book Removed", "success");
  e.preventDefault();
});
