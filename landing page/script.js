window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("header").style.padding = "10px 0";
        document.getElementById("head").style.fontSize = "1.2em";
        document.getElementById("header").style.backgroundImage = "linear-gradient(to right, #654947, #ddd1cb)";
    } else {
        document.getElementById("header").style.padding = "10px 0";
        document.getElementById("head").style.fontSize = "1.5em";
        document.getElementById("header").style.backgroundImage = "linear-gradient(to right, #b09087, #533c3b)";
    }
}




