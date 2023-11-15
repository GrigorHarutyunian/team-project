const apiUrl = 'https://openlibrary.org/search.json?q=';
const resultsPerPage = 20;

function displayResults(books) {
    const resultsContainer = document.getElementById('results');

    books.forEach(book => {
        resultsContainer.innerHTML += `
            <div class="books__result-item">
                <h2><strong>Title:</strong> ${book.title}</h2>
                <h3><strong>Author Name:</strong> ${book.author_name ? book.author_name.join(', ') : 'N/A'}</h3>
                <p><strong>First Publish Year:</strong> ${book.first_publish_year || 'N/A'}</p>
                <p><strong>Subject:</strong> ${book.subject ? book.subject.slice(0, 5).join(', ') : 'N/A'}</p>
            </div>
        `;
    });
}

async function searchBooks() {
    const bookInput = document.getElementById('bookInput').value;
    const resultsContainer = document.getElementById('results');
    const paginationContainer = document.getElementById('pagination');

    const apiUrlFirstPage = `${apiUrl}${bookInput}&limit=${resultsPerPage}`;

    try {
        const response = await fetch(apiUrlFirstPage);
        const data = await response.json();

        resultsContainer.innerHTML += `<div class="books__total-results">Total results: ${data.numFound}</div>`;

        displayResults(data.docs);

        const totalPages = Math.ceil(data.numFound / resultsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            paginationContainer.appendChild(pageButton);

            if (i === currentPage) {
                pageButton.classList.add('active');
            }
        }
    } catch (error) {
        throw new Error('Error fetching data');
    }
}
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    searchBooks();
});
