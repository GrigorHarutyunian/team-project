window.onscroll = function() {
    myFunction()
}

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