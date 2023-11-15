const apiUrl = 'https://openlibrary.org/search.json?q=';
const resultsPerPage = 20;

async function searchBooks() {
    const bookInput = document.getElementById('bookInput').value;
    const resultsContainer = document.getElementById('results');
    const paginationContainer = document.getElementById('pagination');

    const apiUrlFirstPage = `${apiUrl}${bookInput}&limit=${resultsPerPage}`;

    try {
        const response = await fetch(apiUrlFirstPage);
        const data = await response.json();

        resultsContainer.innerHTML += `<div class="books__total-results">Total results: ${data.numFound}</div>`;
    } catch (error) {
        throw new Error('Error fetching data');
    }
}
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    searchBooks();
});
