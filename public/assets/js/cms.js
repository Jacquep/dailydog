$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and author select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var tagInput =$("#tag");
  //var authorSelect = $("#author");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var dogpostId;
  var doguserId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?dogpost_id=") !== -1) {
    dogpostId = url.split("=")[1];
    getPostData(dogpostId, "dogpost");
  }
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  else if (url.indexOf("?doguser_id=") !== -1) {
    doguserId = url.split("=")[1];
  }

  // Getting the authors, and their posts
  getDogUsers();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !authorSelect.val()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newDogPost = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      DogUserId: authorSelect.val()
    };

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newDogPost.id = dogpostId;
      updatePost(newDogPost);
    }
    else {
      submitPost(newDogPost);
    }
  }

  // Submits a new post and brings user to blog page upon completion
  function submitPost(dogpost) {
    $.dogpost("/api/dogposts", dogpost, function() {
      window.location.href = "/dogposts";
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
  function getPostData(id, type) {
    var queryUrl;
    switch (type) {
      case "dogpost":
        queryUrl = "/api/dogposts/" + id;
        break;
      case "doguser":
        queryUrl = "/api/dogusers/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.DogUserId || data.id);
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        tagInput.val(data.tag);
        doguserId = data.DogUserId || data.id;
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Authors and then render our list of Authors
  // function getDogUsers() {
  //   $.get("/api/dogusers", renderDogUsersList);
  // }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  // function renderDogUsersList(data) {
  //   if (!data.length) {
  //     window.location.href = "/dogusers";
  //   }
  //   $(".hidden").removeClass("hidden");
  //   var rowsToAdd = [];
  //   for (var i = 0; i < data.length; i++) {
  //     rowsToAdd.push(createDogUserRow(data[i]));
  //   }
  //   authorSelect.empty();
  //   console.log(rowsToAdd);
  //   console.log(authorSelect);
  //   authorSelect.append(rowsToAdd);
  //   authorSelect.val(doguserId);
  // }

  //Creates the options in the dropdown
  function createDogUserRow(doguser) {
    var listOption = $("<option>");
    listOption.attr("value", doguser.id);
    listOption.text(doguser.name);
    return listOption;
  }

  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/dogposts",
      data: post
    })
    .done(function() {
      window.location.href = "/blog";
    });
  }
});
