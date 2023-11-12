function filterSearch() {
    let input, filter;
    input = document.getElementById('filter');
    filter = input.value.toUpperCase();
    title = document.querySelectorAll('.country .content h3');

    for (i = 0; i < title.length; i++) {
        title_text = title[i].textContent.toUpperCase();

        if (title_text.indexOf(filter) > -1 ) {
            title[i].closest('.country').style.display = "";
        } else {
            title[i].closest('.country').style.display = 'none'; 
        }
    }
}