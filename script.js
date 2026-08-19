//sidebar fuction to toggle
const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click",loadSidebar);

function loadSidebar(){
    sidebar.classList.toggle("closed");
}

//adding book in localStorage
const addBookForm = document.getElementById("addBookForm");
let books = JSON.parse(localStorage.getItem("books")) || [];
addBookForm.addEventListener("submit",addingBook);

function addingBook(event){
    event.preventDefault();
    const bookname = document.getElementById("bookname").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const pages = document.getElementById("pages").value;
    const status = document.getElementById("status").value;

    console.log(bookname);
    console.log(author);
    console.log(genre);
    console.log(pages);
    console.log(status);

    const book={bookname,author,genre,pages,status};

    books.push(book);
    localStorage.setItem("books",JSON.stringify(books));
    displayBooks();
    addBookForm.reset();
    alert("Book added successfully");
}

//showcase of the books in library

const showBooks = document.getElementById("showBooks");

function displayBooks(){
    showBooks.innerHTML =" ";
    books.forEach(function(book,index){

    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML=`
        <h2>${book.bookname}</h2>
        <p><strong>Author: </strong>${book.author}</p>
        <p><strong>Genre: </strong>${book.genre}</p>
        <p><strong>Pages: </strong>${book.pages}</p>
        <p><strong>Status: </strong>${book.status}</p>
        `;
        showBooks.appendChild(bookCard);
        });
}

displayBooks();