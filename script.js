//sidebar fuction to toggle
const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click", loadSidebar);

function loadSidebar() {
    sidebar.classList.toggle("closed");
}

//to check whether the book has been completed reading

function checkCompleted(book) {
    if (Number(book.pagesRead) >= Number(book.pages)) {
        book.pagesRead = Number(book.pages);
        book.status = "Completed";
    }

}
let books = JSON.parse(localStorage.getItem("books")) || [];

books.forEach(function (book) {
    if (book.pagesRead === undefined) {
        book.pagesRead = 0;
    }
    checkCompleted(book);
});

const addBookForm = document.getElementById("addBookForm");
const bookname = document.getElementById("bookname");
const author = document.getElementById("author");
const genre = document.getElementById("genre");
const pages = document.getElementById("pages");
const pagesRead = document.getElementById("pagesRead");
const status = document.getElementById("status");

addBookForm.addEventListener("submit", addBooks);

//to add books in localStorage
function addBooks(event) {
    event.preventDefault();

    if (Number(pagesRead.value) > Number(pages.value)) {
        alert("Pages read cannot be greater than total pages.");
        return;
    }

    const book = {
        bookname: bookname.value,
        author: author.value,
        genre: genre.value,
        pages: Number(pages.value),
        pagesRead: Number(pagesRead.value),
        status: status.value
    };

    books.push(book);
    saveBooks();
    displayBooks();
    WanttoReadBooks();
    CurrentlyReadingBooks();
    CompletedBooks();
    displayReadingCount();
    addBookForm.reset();

}

//to save the books
function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

const showBooks = document.getElementById("showBooks");

function displayBooks() {
    showBooks.innerHTML = "";
    books.forEach(function (book, index) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const progress = (Number(book.pagesRead) / Number(book.pages)) * 100;

        bookCard.innerHTML = ` 
            <h3>${book.bookname}</h3>
            <p><strong>Author: </strong>${book.author}</p>
            <p><strong>Genre: </strong>${book.genre}</p>
            <p><strong>Pages: </strong>${book.pages}</p>
            <p><strong>Pages Read: </strong>${book.pagesRead}</p>
            <p><strong>Status: </strong>${book.status}</p>
            <p><strong>Progress: </strong>${progress.toFixed(0)}%</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <button onclick="updateBook(${index})">Update</button>
            <button onclick="deleteBook(${index})">Delete</button>`;
        showBooks.appendChild(bookCard);
    });
}

//to filter out the wanna read, completed and currently reading

const wanttoreadbooks = document.getElementById("wanttoreadbooks");
const currentlyreadingbooks = document.getElementById("currentlyreadingbooks");
const completedbooks = document.getElementById("completedbooks");

function WanttoReadBooks() {
    wanttoreadbooks.innerHTML = "";
    const wanttoread = books.filter(function (book) {
        return book.status === "Want to Read";
    });

    wanttoread.forEach(function (book, index) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const progress = (Number(book.pagesRead) / Number(book.pages)) * 100;

        bookCard.innerHTML = ` 
            <h3>${book.bookname}</h3>
            <p><strong>Author: </strong>${book.author}</p>
            <p><strong>Genre: </strong>${book.genre}</p>
            <p><strong>Pages: </strong>${book.pages}</p>
            <p><strong>Pages Read: </strong>${book.pagesRead}</p>
            <p><strong>Status: </strong>${book.status}</p>
            <p><strong>Progress: </strong>${progress.toFixed(0)}%</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>`;
        wanttoreadbooks.appendChild(bookCard);
    });
}


function CurrentlyReadingBooks() {
    currentlyreadingbooks.innerHTML = "";
    const currently = books.filter(function (book) {
        return book.status === "Currently Reading";
    });

    currently.forEach(function (book, index) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const progress = (Number(book.pagesRead) / Number(book.pages)) * 100;

        bookCard.innerHTML = ` 
            <h3>${book.bookname}</h3>
            <p><strong>Author: </strong>${book.author}</p>
            <p><strong>Genre: </strong>${book.genre}</p>
            <p><strong>Pages: </strong>${book.pages}</p>
            <p><strong>Pages Read: </strong>${book.pagesRead}</p>
            <p><strong>Status: </strong>${book.status}</p>
            <p><strong>Progress: </strong>${progress.toFixed(0)}%</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>`;
        currentlyreadingbooks.appendChild(bookCard);
    });
}


function CompletedBooks() {
    completedbooks.innerHTML = "";
    const completed = books.filter(function (book) {
        return book.status === "Completed";
    });

    completed.forEach(function (book, index) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const progress = (Number(book.pagesRead) / Number(book.pages)) * 100;

        bookCard.innerHTML = ` 
            <h3>${book.bookname}</h3>
            <p><strong>Author: </strong>${book.author}</p>
            <p><strong>Genre: </strong>${book.genre}</p>
            <p><strong>Pages: </strong>${book.pages}</p>
            <p><strong>Pages Read: </strong>${book.pagesRead}</p>
            <p><strong>Status: </strong>${book.status}</p>
            <p><strong>Progress: </strong>${progress.toFixed(0)}%</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>`;
        completedbooks.appendChild(bookCard);
    });
}

//to display the reading counts of books

const wanttoreadcount = document.getElementById("wanttoreadcount");
const currentlyreadingcount = document.getElementById("currentlyreadingcount");
const completedcount = document.getElementById("completedcount");
const pagesread = document.getElementById("pagesread");
const favouriteGenre = document.getElementById("favGenre");

function displayReadingCount() {
    const wanttoread = books.filter(function (book) {
        return book.status === "Want to Read";
    });
    const currently = books.filter(function (book) {
        return book.status === "Currently Reading";
    });
    const completed = books.filter(function (book) {
        return book.status === "Completed";
    });

    let totpagesread = 0;
    books.forEach(function (book) {
        totpagesread += Number(book.pagesRead)
    });

    const genreCount = {};
    books.forEach(function (book) {
        if (genreCount[book.genre]) {
            genreCount[book.genre]++;
        } else {
            genreCount[book.genre] = 1;
        }
    });
    let favGenre = "None";
    let highestCount = 0;
    for (let genre in genreCount) {
        if (genreCount[genre] > highestCount) {
            highestCount = genreCount[genre];
            favGenre = genre;
        }
    }
    wanttoreadcount.textContent = wanttoread.length;
    currentlyreadingcount.textContent = currently.length;
    completedcount.textContent = completed.length;
    pagesread.textContent = totpagesread;
    favouriteGenre.textContent = favGenre;
}

//to update the pages of books

function updateBook(index) {
    const book = books[index];
    const newTitle = prompt("Enter book title: ", book.bookname);
    const newAuthor = prompt("Enter author: ", book.author);
    const newPages = prompt("Enter total pages: ", book.pages);
    const newPagesRead = prompt("Enter pages read: ", book.pagesRead);

    if (newTitle === null || newAuthor === null || newPages === null || newPagesRead === null) {
        return;
    }
    if (Number(newPagesRead) > Number(newPages)) {
        alert("Pages read cannot be greater than total pages.");
        return;
    }
    book.bookname = newTitle;
    book.author = newAuthor;
    book.pages = Number(newPages);
    book.pagesRead = Number(newPagesRead);

    checkCompleted(book);
    saveBooks();
    displayBooks();
    WanttoReadBooks();
    CurrentlyReadingBooks();
    CompletedBooks();
    displayReadingCount();
}

//to delete the books stored
function deleteBook(index) {
    const confirmDelete = confirm("Are you sure you want to delete this Book?");
    if (confirmDelete) {
        books.splice(index, 1);
        saveBooks();
        displayBooks();
        WanttoReadBooks();
        CurrentlyReadingBooks();
        CompletedBooks();
        displayReadingCount();
    }
}

//to show the results of the search bar

const searchBook = document.getElementById("searchBook");
const searchResults = document.getElementById("searchResults");

searchBook.addEventListener("input", searchBooks);

function searchBooks() {
    const searchText = searchBook.value.toLowerCase().trim();
    searchResults.innerHTML = "";

    if (searchText === "") {
        return;
    }

    const filteredBooks = books.filter(function (book) {
        return book.bookname.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText) ||
            book.genre.toLowerCase().includes(searchText);
    });

    filteredBooks.forEach(function (book) {
        const result = document.createElement("div");
        result.classList.add("search-result");

        result.innerHTML = `
        <strong class="search-book-name">${book.bookname}</strong>
        <small>Author: ${book.author} | Genre: ${book.genre}</small>`;

        result.querySelector(".search-book-name").addEventListener("click", function () {
            goToBook(book);
        });

        searchResults.appendChild(result);
    });
    if (filteredBooks.length === 0) {
        searchResults.innerHTML = "<div class='search-result'>No book found</div>";
    }
}

//to be able to show the searched book in library

function goToBook(book) {
    document.getElementById("library-page").scrollIntoView({
        behavior: "smooth"
    });

    const bookCards = document.querySelectorAll(".book-card");
    bookCards.forEach(function (card) {
        if (card.querySelector("h3").textContent === book.bookname) {
            card.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
            card.style.outline = "3px solid #2D4F3E";

            setTimeout(function () {
                card.style.outline = "";
            }, 2000);
        }
    });
    searchResults.innerHTML = "";
    searchBook.value = "";
}
displayBooks();
WanttoReadBooks();
CurrentlyReadingBooks();
CompletedBooks();
displayReadingCount();