
$(document).ready(function() {
  // get the username to fill out the user logged in
  $.ajax({
    url: "/api/username",
    success: function(result) {
      $('.userName').text(result.user.firstname + " " + result.user.lastname);
    }
  });

  getChildren();
  // get all children and create the buttons
  function getChildren() {
    $.ajax({
      url: "/api/childs",
      success: function(result) {
        console.log(result);
        // clear the container
        $('.childButtonContainer').empty();
        // loop through and add all of the children buttons
        result.forEach(child => {
          let name = `${child.firstname} ${child.lastname}`;
          $('.childButtonContainer').append(createChildButton(name, child.id));
        });
      }
    });
  }

  function addChild(event) {
    console.log('fdsjfjsd');
    event.preventDefault();
    var form_data = new FormData($('#uploadForm')[0]);
    $.ajax({
      url: "/api/childs",
      type: 'POST',
      data: form_data,
      processData: false,
      contentType: false,
      success: function(result) {
        // close the modal
        $('#closeModal').click();
        document.location.href='/home';
        getChildren();
      }
    });
  }

  function createChildButton(name, id) {
    var $button = $('<button>');
    $button.addClass("btn btn-default big-btn childButton");
    $button.attr('id', id);
    $button.text(name);
    return $button;
  }

  // add event listeners
  $(document).on('click', '.childButton', function(){
    localStorage.setItem("currentChildId", $(this).attr('id'));
    document.location.href='/profile/' + $(this).text();
  });
  $( "#uploadForm" ).submit(addChild);
});
