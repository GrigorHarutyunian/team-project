function clear(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function filterSearch() {
    const input = document.getElementById('filter');
    const filter = input.value.toUpperCase();
    const title = document.querySelectorAll('.country .content h3');
    const autocomplate = document.getElementById('autocomplate');

    clear(autocomplate);

    for (i = 0; i < title.length; i++) {
        title_text = title[i].textContent.toUpperCase();

        if (title_text.indexOf(filter) > -1 ) {
            title[i].closest('.country').style.display = "";
            const name = document.createElement('p');
            name.innerText = title[i].textContent;
            autocomplate.append(name);
        } else {
            title[i].closest('.country').style.display = 'none';
        }
    }
}

document.addEventListener('click', () => {
    const autocomplate = document.getElementById('autocomplate');

    clear(autocomplate);
})