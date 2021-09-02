document.getElementById('error-message').style.display = 'none';
document.getElementById('book-numbers').style.display = 'none';

// button call
const searchBooks = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear data
    searchField.value = '';

    if (searchText === '') {
        displayError()
    } else {

        // booklist number show
        document.getElementById('book-numbers').style.display = 'block';

        const url = `http://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
    }
}

// Error function
const displayError = () => {
    document.getElementById('book-numbers').style.display = 'none';
    document.getElementById('error-message').style.display = 'block';
}

// Display Search Result
const displaySearchResult = booksDetail => {
    const searchResult = document.getElementById('search-result');
    
    // clear data
    searchResult.textContent = '';

    const bookList = booksDetail.docs;
    bookList.forEach(book => {

        if (bookList === null) {
            displayError()
        } else {
            // error handel
            document.getElementById('error-message').style.display = 'none';
            // booklist number
            document.getElementById('book-numbers').innerText = `books Found ${bookList.length}`;

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div  class="card h-100 text-center">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i: 'No Result'}-M.jpg" class="w-50 h-50 mx-auto" alt="">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${book.title}</h5>
                        <p class="card-text fs-5">Writer: ${book.author_name[0] ? book.author_name: 'No result'}</p>
                        <p class="card-text fs-5">Publisher: ${book.publisher[0] ? book.publisher: 'No result'}</p>
                        <p class="card-text fs-5">First Publish: ${book.first_publish_year ? book.first_publish_year: 'No result'}</p>
                    </div>
                </div>
                `;
            searchResult.appendChild(div);
        }
    });
};