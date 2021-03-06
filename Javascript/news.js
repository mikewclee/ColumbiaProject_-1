console.log("news.js loaded");

var kWord;
var myNewsKey = configNews.newsKey;
var mynewsSecret = configNews.newsSecretKey;
var myNewsKey_2 = configNews.newskey_2;
var fullNewsKey = configNews.newsKey + configNews.newsSecretKey + configNews.newskey_2
console.log(fullNewsKey);

$(document).ready(function () {

  // When the user enters their input and presses "Enter", the search will begin
  $("#userInput").on("keypress", function (e) {
    if (e.key === "Enter") {
      event.stopPropagation();
      event.preventDefault();
      console.log("User pressed 'Enter'");
      keyWord = $("#userInput").val(); // need to be able to translate spaces into a URL string
      console.log("User input:", keyWord);
      startSearch();
      $("#search-loading").addClass("loading");
    }
  });

  function startSearch() {
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=10&q=" +
        keyWord +
        "&safeSearch=true",
      method: "GET",
      headers: {
        "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
        "x-rapidapi-key": fullNewsKey,
      },
    };

    $.ajax(settings).done(function (newsData) {
      console.log(newsData);

      $(".ui.cards").empty();
      $("#search-loading").removeClass("loading")
      

      for (var i = 0; i < newsData.value.length; i++) {
        // console.log(newsData.value[i].title);
        // console.log(newsData.value[i].image.thumbnail);
        // console.log(newsData.value[i].datePublished);
        // console.log(newsData.value[i].description);
        // console.log(newsData.value[i].url);
        console.log("--->", i, "-----", newsData.value[i]);
        if (newsData.value[i].image.height !== 0) {
          $(".ui.cards").attr("id", "articleNumber-" + i);
          var image = $("<img>");
          image
            .attr("src", newsData.value[i].image.thumbnail)
            .css({'width': '200', 'height': '200', 'float': 'left', 'padding-right': '5px'});

          
          var title = $("<h3>");
          title
            .addClass("header")
            .text(newsData.value[i].title.replace(/(<([^>]+)>)/gi, ""))
            .css({'color': 'white', 'margin-top': '0'});;
          var description = $("<div>");
          description
            .addClass("description")
            .text(newsData.value[i].description.replace(/(<([^>]+)>)/gi, ""))
            .css('color', 'white');
          var date = $("<div>");
          var formattedDate = new Date(newsData.value[i].datePublished);
          formattedDate = formattedDate;
          date.addClass("extra content")
            .text(formattedDate)
            .css('color', 'white');;
          var url = $("<a>");
          url
            .addClass("extra content")
            .attr({ href: newsData.value[i].url, target: "_blank" })
            .text("The journey continues here.");
          var content = $("<div>").addClass("content");

          content.append(image, title, description, date, url);
          $(".ui.cards").append(content);
          
        }
      }
    });
  }
});
