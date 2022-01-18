class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}


class UI {
  addBookToList(book) {
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
  }

  showAlert(message, className) {
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
  }

  deleteBook(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
  }

  clearFields() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
  }
}


//Local Storage Class
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books')  === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(book => {
      const ui = new UI;

      ui.addBookToList(book);
    })
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book)

    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(isbn) {
    console.log(isbn)
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn){
      books.splice(index, 1);
      }
    })

    localStorage.setItem("books", JSON.stringify(books));
  }
}


//DOM Listener
document.addEventListener('DOMContentLoaded', Store.displayBooks)

//Even listener for adding book
document.getElementById("book-form").addEventListener("submit", function (e) {
  //get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  //instantiate book
  const book = new Book(title, author, isbn);

  //instantiate UI
  const ui = new UI();

  //validate
  if (title === "" || author === "" || isbn === "") {
    //Error alert
    ui.showAlert("please fill in all fields", "error");
  } else {
    //add book to list
    ui.addBookToList(book);

    //add to LS
    Store.addBook(book);
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

  ui.deleteBook(e.target);

  //delete form LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

  ui.showAlert("Book Removed", "success");
  e.preventDefault();
});
