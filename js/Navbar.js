document.getElementById("menu-button").addEventListener("click", () =>
{
    document.getElementById("nav-list").classList.toggle("show");
});



window.addEventListener("scroll", function() {
    var navbar = document.querySelector(".navbar");
    if (window.pageYOffset > 0) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
});
