/* eslint-disable */

var token = "";
var type = "";

$(document).ready(function() {
  $(".js-send-notification").on("click", function() {
    var $row = $(this).closest("tr");
    token = $row
      .find("td.token")
      .text()
      .trim();
    type = $row
      .find("td.type")
      .text()
      .trim();

    console.log("set token to " + token);
    console.log("set type to" + type);

    $(".modal").modal("show");
    $(".modal .modal-title span").text(token);
  });

  $(".js-send-notification-submit").on("click", function() {
    var reqUri = window.API_URI + "/notification/" + type;
    $.ajax({
      type: "POST",
      url: reqUri,
      data: {
        token: token
      },
      success: function() {
        console.log("success");
      },
      dataType: "json"
    });

    $(".modal").modal("hide");
  });
});
