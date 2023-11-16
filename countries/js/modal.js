function openModal(element, event) {
    event.stopPropagation();
    element.nextSibling.classList.add('active');
    document.body.classList.add('disabled');
}

function closeModal(element, event) {
    event.stopPropagation();
    element.parentElement.classList.remove('active');
    document.body.classList.remove('disabled');
}

