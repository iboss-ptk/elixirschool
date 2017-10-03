(function($) {
  var unique = function(array) {
    return array
      .reduce(function(acc, curr) {
        var isAppeared = acc.indexOf(curr) !== -1;
        return isAppeared ? acc : acc.concat([curr]);
      }, []);
  };

  $.fn.contributors = function() {
    var filePath = window.location.pathname.replace(/^\/(.*)\/$/, "$1.md");
    var commitsApiEndpoint = "https://api.github.com/repos/elixirschool/elixirschool/commits?path=" + filePath + "&per_page=100";
    var self = this;
    var statusElement = $(self).find(".status");

    var populateContributors = function(commits) {
      statusElement.remove()

      var usernames = commits.map(function(commit) {
        return commit.author.login;
      });

      unique(usernames).forEach(function(username) {
        var content = "" +
          "<a class=\"tooltip\" href=\"https://github.com/" + username + "\">" +
            "<img src=\"https://github.com/" + username + ".png?size=50\" >" +
            "<span class=\"tooltiptext\">" + username + "</span>" +
          "</a>";

        $(self).append(content);
      })
    }

    try {
      $.get(commitsApiEndpoint, populateContributors);
    } catch (e) {
      console.log(e);
      statusElement.text('fail to fetch contributors from github');
    }
  };
})(jQuery);
