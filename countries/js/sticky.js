var nav = document.getElementById("nav");
var sticky = nav.offsetTop;

function myFunction() {
  const topButton = document.getElementById("topButton");
  
  if (window.pageYOffset >= sticky + 100) {
    nav.classList.add("sticky")
  } else {
    nav.classList.remove("sticky");
  }

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      topButton.style.display = "block";
  } else {
      topButton.style.display = "none";
  }
}

function lazyLoad() {
  const lazyImages = document.querySelectorAll('.lazy_load');

  lazyImages.forEach(img => {
    const imgRect = img.getBoundingClientRect();

    if (
      imgRect.top >= 0 &&
      imgRect.left >= 0 &&
      imgRect.top <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
      img.src = img.src;
      img.classList.remove('lazy_load');
    }
  });
}

function scrollDown() {
  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
}

window.onscroll = function() {
  myFunction();
  lazyLoad();
}

setTimeout(lazyLoad, 1000);