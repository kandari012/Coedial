// fetching data from form and sending data in json format to application
// submitting data using jquery ajax

//{} for scopes
{
  // --------------------------------------------------------------------
  // post part

  //  method to fetch data from form and send data in json format  using jquery AJAX to receive in post controller action
  let createPost = function () {
    let newPostForm = $("#new-post-form"); //get the from ejx from id

    newPostForm.submit(function (event) {
      event.preventDefault(); //prevent default submit nature of form

      //manually submit using ajax
      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(), //serailize convert form data into json
        //get data from the controller action and display it
        success: function (data) {
          //data already in json format
          let newPost = newPostDom(data.data); //call fxn to craete post
          $("#post-list-container>ul").prepend(newPost); //add post to dom
          deletePost($(" .delete-post-button", newPost)); // j query syntax delete link inside new post ,find class inside new post apply ajax on the delete button of new created post
          Like($(" .like", newPost)); // apply on like
          createComment($(" .new-comment-form", newPost));
          notyNotificationSuccess("Post Created");
        },
        error: function (error) {
          notyNotificationError(error);
          console.log(error.responseText);
        },
      });
    });
  };

  //method to create a post in DOM

  let newPostDom = function (data) {
    //   string interpolation `rahul ${x}`
    //$(x) converting dom object to jquery object

    //instead of <%=%> will use ${} in jquery
    //to interpolate string used back tick used $ to return jquery object instaed of dom object
    return $(`<li id="post-${data.post._id}">
    <!-- check user exist and can only see delete if the user created the post is
      loged in  -->
    
    <small><a class="delete-post-button" href="/posts/destroy/${data.post._id}">Delete</a></small>
   
    <small>
    <a class="like" href="likes/toggle/?id=${data.post._id}&type=Post"
      >like ${data.post.likes.length}</a
    ></small
  >
    <p>${data.post.content}</p>
        <p>${data.username}</p>
    <div>
      
      <form action="/comments/create" method="POST" class="new-comment-form">
        <input
          type="text"
          name="content"
          placeholder="Type your comment here"
          required
        />
        <!-- hidden field -->
        <input type="hidden" name="post" value="${data.post._id}" />
        <input type="submit" value="Add Comment" />
      </form>
      
  
      <div class="comment-list-container">
        <ul id="post-comments-${data.post._id}">
         
        </ul>
      </div>
    </div>
  </li>
  `);
  };

  //method to delete a post from DOM
  let deletePost = function (deleteLink) {
    //deleteLink link of delete for each post a tag from _post.ejs
    console.log("ajax called to delete post", deleteLink);
    $(deleteLink).click(function (event) {
      event.preventDefault(); //remove natural behaviour

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"), //value of href from a tag   also contain post id
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
          notyNotificationSuccess("Post Deleted");
        },
        error: function (error) {
          notyNotificationError(error);
          console.log("error.responseText");
        },
      });
    });
  };

  // -----------------------------------------------------------------------------
  // comment part

  //create comment
  let createComment = function (comment) {
    console.log("addcomment", comment);
    $(comment).submit(function (event) {
      event.preventDefault(); //prevent default submit nature of form

      $.ajax({
        type: "post",
        url: "/comments/create",
        data: $(comment).serialize(), //serailize convert form data into json
        //get data from the controller action and display it
        success: function (data) {
          let newComment = newCommentDom(data.data); //call fxn to craete post
          let x = `post-comments-${data.data.post_id}`; //id of ul within perticular post
          $(`#${x}`).prepend(newComment);
          deleteComment($(" .delete-comment-button", newComment));
          Like($(" .like", newComment));
          notyNotificationSuccess("Comment Created");
        },
        error: function (error) {
          notyNotificationError(error);
          console.log(error.responseText);
        },
      });
    });
  };

  //method to create a comment in DOM

  let newCommentDom = function (data) {
    return $(`<li id="comment-${data.comment._id}">

<small><a class="delete-comment-button" href="/comments/destroy/${data.comment._id}">Delete</a></small>

<small
    ><a class="like" href="likes/toggle/?id=${data.comment._id}&type=Comment"
      >like ${data.comment.likes.length}</a
    ></small
  >
<p>${data.comment.content}</p>
<small>${data.username}</small>
</li>`);
  };

  //method to delete a comment from DOM
  let deleteComment = function (deleteLink) {
    //deleteLink link of delete for each post a tag from _post.ejs
    console.log("ajax called to delete comment", deleteLink);
    console.log("link", $(deleteLink).prop("href"));
    console.log($(deleteLink));
    $(deleteLink).click(function (event) {
      event.preventDefault(); //remove natural behaviour
      console.log("remove natural behaviour");
      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"), //value of href from a tag   also contain post id
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();
          notyNotificationSuccess("Comment Deleted");
        },
        error: function (error) {
          notyNotificationError(error);
          console.log("error.responseText");
        },
      });
    });
  };

  //apply AJAX action on all comment and  post actions
  let AjaxCallToCommentAndPostAndLike = function () {
    createPost(); //call craete post

    // apply delete post to all posts craeted before new post
    let deleleAllPost = $(".delete-post-button");
    for (let i of deleleAllPost) {
      deletePost($(i));
    }

    let newCommentForm = $(".new-comment-form"); //call createcomment on commnet form of all post
    for (const comment of newCommentForm) {
      createComment(comment);
    }
    //  apply delete to all comment created before creating new comment
    let deleleAllComment = $(".delete-comment-button");
    for (let i of deleleAllComment) {
      console.log("data to delete comment", $(i));
      deleteComment($(i));
    }
    // apply to all like buttons
    let likable = $(".like");
    for (let i of likable) {
      console.log("data to like", $(i));
      Like($(i));
    }
  };

  let notyNotificationSuccess = function (message) {
    new Noty({
      theme: "relax",
      text: message,
      type: "success",
      layout: "topRight",
      timeout: 1500,
    }).show();
  };

  let notyNotificationError = function (message) {
    new Noty({
      theme: "relax",
      text: message,
      type: "error",
      layout: "topRight",
      timeout: 1500,
    }).show();
  };

  //likes code

  //method on like
  let Like = function (like) {
    //deleteLink link of delete for each post a tag from _post.ejs
    console.log("ajax called to like", like);
    $(like).click(function (event) {
      event.preventDefault(); //remove natural behaviour

      $.ajax({
        type: "get",
        url: $(like).prop("href"), //value of href from a tag   also contain post id
        success: function (data) {
          notyNotificationSuccess("liked");
          //find post or commnet id
          let x = $(`#comment-${data.data.likeable._id}`);
          let y = $(`#post-${data.data.likeable._id}`);

          $(" .like", x).html(`Like ${data.data.likeable.likes.length}`);
          //change text of first like link inside commnet
          $(" .like", y)
            .first()
            .html(`Like ${data.data.likeable.likes.length}`);
          console.log($(" .like", x));
          console.log($(" .like", y));
        },
        error: function (error) {
          notyNotificationError(error);
          console.log("error.responseText");
        },
      });
    });
  };

  AjaxCallToCommentAndPostAndLike();
}
