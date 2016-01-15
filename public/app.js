// This script takes care of storing starred RSS feed items in
// localStorage in the user's browser.
window.addEventListener("load", function () {

  // The name of the variable to hold the starred items.
  var STORAGE_KEY = "favorites";

  // A solid star represents a favorite.
  var IS_FAVORITE = "★";
  var IS_NOT_FAVORITE = "☆";

  // The browser must support localStorage.
  if (localStorage) {

    // Grab any existing favorites.
    var favorites = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    // Loop through each article and add the appropriate star based on
    // whether or not it has already been favorited.
    var articles = Array.prototype.slice.call(document.querySelectorAll("li"));
    articles.forEach(function (article) {
      var headline = article.querySelector(".headline");
      var star = article.querySelector(".star");
      star.textContent = (favorites[headline.textContent] ? IS_FAVORITE : IS_NOT_FAVORITE);
    });

    // Listen for any click event. If is happened on a star, then
    // toggle the state of the star and update localStorage.
    window.addEventListener("click", function (event) {
      if (event.target.classList.contains("star")) {
        var star = event.target;
        var adding = (star.textContent === IS_NOT_FAVORITE);
        var headline = star.previousElementSibling;
        favorites[headline.textContent] = adding;
        star.textContent = adding ? IS_FAVORITE : IS_NOT_FAVORITE;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      }
    });
  }
});
