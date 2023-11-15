window.onscroll = function() {
    myFunction()
}

var nav = document.getElementById("nav");
var sticky = nav.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky + 100) {
    nav.classList.add("sticky")
  } else {
    nav.classList.remove("sticky");
  }
}