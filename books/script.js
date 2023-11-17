const apiUrl = 'https://openlibrary.org/search.json?q=';
const resultsPerPage = 20;
let currentPage = 1;

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    searchBooks();
});

document.getElementById('pagination').addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        const pageNumber = parseInt(event.target.textContent);
        if (!isNaN(pageNumber)) {
            getPage(pageNumber);

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
});

function resetSearch() {
    currentPage = 1;
    const resultsContainer = document.getElementById('results');
    const paginationContainer = document.getElementById('pagination');

    resultsContainer.innerHTML = '';
    paginationContainer.innerHTML = '';
}

async function searchBooks() {
    resetSearch();

    const bookInput = document.getElementById('bookInput').value;
    const resultsContainer = document.getElementById('results');
    const paginationContainer = document.getElementById('pagination');

    resultsContainer.innerHTML = '';
    paginationContainer.innerHTML = '';

    const apiUrlFirstPage = `${apiUrl}${bookInput}&limit=${resultsPerPage}`;

    try {
        const response = await fetch(apiUrlFirstPage);
        const data = await response.json();

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

        resultsContainer.innerHTML += `<div class="books__total-results" data-aos="flip-up" data-aos-delay="200" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="false">Total results: ${data.numFound}</div>`;
    } catch (error) {
        throw new Error('Error fetching data');
    }
}

async function getPage(pageNumber) {
    currentPage = pageNumber;

    const bookInput = document.getElementById('bookInput').value;
    const apiUrlWithPage = `${apiUrl}${encodeURIComponent(bookInput)}&page=${pageNumber}&limit=${resultsPerPage}`;

    try {
        const response = await fetch(apiUrlWithPage);
        const data = await response.json();

        displayResults(data.docs);

        updateActivePagination();
    } catch (error) {
        throw new Error('Error fetching data');
    }
}

function updateActivePagination() {
    const paginationButtons = document.querySelectorAll('#pagination button');
    paginationButtons.forEach((button, index) => {
        if (index + 1 === currentPage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function displayResults(books) {
    const resultsContainer = document.getElementById('results');

    resultsContainer.innerHTML = '';

    books.forEach(book => {
        resultsContainer.innerHTML += `
            <div class="books__result-item"
                 data-aos="fade-up"
                 data-aos-delay="200"
                 data-aos-duration="800"
                 data-aos-easing="ease-in-out"
                 data-aos-mirror="false"
                 data-aos-once="true"
            >
                <h2><strong>Title:</strong> ${book.title}</h2>
                <h3><strong>Author Name:</strong> ${book.author_name ? book.author_name.join(', ') : 'N/A'}</h3>
                <p><strong>First Publish Year:</strong> ${book.first_publish_year || 'N/A'}</p>
                <p><strong>Subject:</strong> ${book.subject ? book.subject.slice(0, 5).join(', ') : 'N/A'}</p>
            </div>
        `;
    });
}

// Initialize AOS
AOS.init();

function load() {
    const load = document.getElementById("loading");
    load.style.display = "none";
  }
  
  window.onload = function () {
    setTimeout(load, 500);
  };