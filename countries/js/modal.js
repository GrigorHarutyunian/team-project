function openModal(element) {
    element.nextSibling.classList.add('active');
    document.body.classList.add('disabled');
}

function closeModal(element) {
    element.parentElement.classList.remove('active');
    document.body.classList.remove('disabled');
}

