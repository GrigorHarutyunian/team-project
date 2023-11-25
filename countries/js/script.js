function render() {
  const date = new Date();
  const year = date.getFullYear();
  
  document.body.classList.add('scroll_effect');
  document.body.setAttribute('id', 'body')
  const loading = document.createElement('div')
  loading.setAttribute('class', 'loading_spinner');
  loading.setAttribute('id', 'loading');
  loadingGif = document.createElement('img');
  loadingGif.setAttribute('src', '../images/loading/loading.webp');
  loading.append(loadingGif);
  document.body.append(loading);
  
  const main = document.createElement('main');
  
  const headerSection = document.createElement('header');
  headerSection.setAttribute('id', 'header');
  
  const container = document.createElement('div');
  container.setAttribute('class', 'container');
  
  const navSection = document.createElement('nav');
  navSection.setAttribute('id', 'nav');
  
  const homeLink = document.createElement('a');
  homeLink.setAttribute('href', '../../index.html');
  
  const homeImage = document.createElement('img');
  homeImage.setAttribute('src', '../../images/kisspng-website-house-home-world-wide-web-computer-icons-house-clip-art-5ab036bbf19551.9166615015214977879895.png')
  
  homeLink.append(homeImage);
  
  const form = document.createElement('form');
  form.setAttribute('class', 'search');
  form.setAttribute('autocomplete', 'off');
  
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('onclick', 'showList();');
  input.setAttribute('onkeyup', 'filterSearch(event);');
  input.setAttribute('id', 'filter');
  input.setAttribute('placeholder', 'Search for a country');
  
  const clearTxt = document.createElement('span');
  clearTxt.setAttribute('id', 'clearText');
  clearTxt.setAttribute('class', 'clear_text');
  clearTxt.setAttribute('onclick', 'clearText();')
  
  const clearTxtIcon = document.createElement('i');
  clearTxtIcon.setAttribute('class', 'fa-solid fa-xmark');
  
  clearTxt.append(clearTxtIcon);
  const autoCompleteBox = document.createElement('div');
  autoCompleteBox.setAttribute('id', 'autocomplete');
  autoCompleteBox.setAttribute('class', 'autocomplete_box scroll_effect')
  
  form.append(input);
  form.append(clearTxt);
  form.append(autoCompleteBox);
  
  navSection.append(homeLink);
  navSection.append(form);
  
  const title = document.createElement('h1');
  title.setAttribute('class', 'title');
  title.innerHTML = 'C<img src="../images/logo/logo.png">untries';
  
  container.append(navSection);
  container.append(title);
  
  headerSection.append(container);
  
  const countrieSection = document.createElement('section');
  countrieSection.setAttribute('class', 'countries');
  countrieSection.setAttribute('id', 'countriesList');
  
  const footerSection = document.createElement('footer');
  const footerLink = document.createElement('a');
  footerLink.setAttribute('href', '#body');
  footerLink.setAttribute('class', 'top');
  footerLink.setAttribute('id', 'topButton');
  footerLink.innerText = 'TAP TO TOP';
  footerSection.append(footerLink)
  
  const copyWrite = document.createElement("p");
  copyWrite.innerText = `${year} © Copyrights Countries`;
  footerSection.append(copyWrite);
  
  main.append(headerSection);
  main.append(countrieSection);
  main.append(footerSection);
  
  document.body.append(loading);
  document.body.append(main);
}

function load() {
  const load = document.getElementById("loading");
  load.classList.add('loading_display');
  document.body.style.overflowY = "scroll";
}

setInterval(smoothScroll, 1000);

function smoothScroll() {
  const topButton = document.getElementById("topButton");

  topButton.addEventListener("click", clickHandler);

  function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;

    scroll({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}

function check() {
  const searchInput = document.getElementById("filter");
  const clearText = document.getElementById("clearText");
  if (searchInput.value) {
    clearText.style.display = "block";
  } else {
    clearText.style.display = "none";
  }
}

window.onload = function () {
  setTimeout(load, 1000);
  setInterval(check);
};

render();