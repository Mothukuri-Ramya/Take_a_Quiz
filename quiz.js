
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  
  function logo()
  {
    document.getElementById("fullimage").src="img/36.jpg";
    document.getElementById("fullimageview").style.display="block";
  }

  function closefullview()
  {
    document.getElementById("fullimageview").style.display="none";
  }


// When the user scrolls the page, execute myFunction
window.onscroll = function() {navFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function navFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}