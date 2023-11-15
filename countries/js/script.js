function load() {
    const load = document.getElementById('loading')
    load.style.display = 'none';
}

setInterval(smoothScroll, 1000);

function smoothScroll() {

	const topButton = document.getElementById('topButton');

	topButton.addEventListener("click", clickHandler);

	function clickHandler(e) {
		e.preventDefault();
		const href = this.getAttribute("href");
		const offsetTop = document.querySelector(href).offsetTop;

		scroll({
			top: offsetTop,
			behavior: "smooth"
		});
	}
}

const date = new Date();
const year  = date.getFullYear();
const footer = document.getElementById('footer');
const copyWrite = document.createElement('p');
copyWrite.innerText = `${year} © Copyrights Countries`;
footer.append(copyWrite);

window.onload = function() {
    setTimeout(load, 1000);
}
  