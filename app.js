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

  ui.showAlert("Book Removed", "success");
  e.preventDefault();
});
