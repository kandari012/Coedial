{
  //method on like
  let friend = $(".friend");

  let Friend = function (friend) {
    console.log("ajax called to friend", friend);
    $(friend).click(function (event) {
      event.preventDefault(); //remove natural behaviour

      $.ajax({
        type: "get",
        url: $(friend).prop("href"), //value of href from a tag   also contain post id
        success: function (data) {
          console.log(data);
          //if friend then shoe remove friend else add friend
          if (data.data.friend) {
            friend.html("Remove Friend");
            notyNotificationSuccess("Added Friend");
          } else {
            friend.html("Add Friend");
            notyNotificationSuccess("Removed Friend");
          }
        },
        error: function (error) {
          notyNotificationError(error.responseText);
        },
      });
    });
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

  Friend(friend);
}
