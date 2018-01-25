$(document).ready(function() {
  // get the username to fill out the user logged in
  $.ajax({
    url: "/api/username",
    success: function(result) {
      $('#username').text(result.user.firstname + " " + result.user.lastname);
    }
  });
  getChildInfo();
  getChildsEvents();
  function getChildInfo() {
    var childId = localStorage.getItem('currentChildId');
    $.ajax({
      url: "/api/childs/" + childId,
      success: function(result) {
        let dateFormatted = moment(result.birthdate).format("MMM Do YY");
        $('#kidsName').text(result.firstname + " " + result.lastname);
        $('#babyImage').attr('src', '../' + result.image);
        $('#weight').text(result.weight);
        $('#length').text(result.height);
        $('#birthday').text(dateFormatted);
        console.log(result);
      }
    });
  }
  function getChildsEvents() {
    var childId = localStorage.getItem('currentChildId');
    var params = { child_id: childId };
    var str = jQuery.param( params );
    $.ajax({
      url: "/api/events?" + str,
      success: function(result) {
        $('#cd-timeline').empty();
        console.log(result);
        result.forEach(event => {
          var $event = createTimelineElement(event);
          $('#cd-timeline').append($event);
        });
      }
    });
  }


  function addEvent(event) {
    event.preventDefault();
    var childId = localStorage.getItem('currentChildId');
    var form_data = new FormData($('#eventForm')[0]);
    form_data.append('childId', childId);
    $.ajax({
      url: "/api/events",
      type: 'POST',
      data: form_data,
      processData: false,
      contentType: false,
      success: function(result) {
        // close the modal
        $('#closeModal').click();
        $('#eventForm')[0].reset();
        getChildsEvents();
      }
    });
  }


  // add event listener
  $( "#eventForm" ).submit(addEvent);



});

// This is the add event posistion sticky ========
// When the user scrolls the page, execute myFunction 
window.onscroll = function() {
    addSticky();
};

// Get the navbar
var addEventBtn = document.getElementById("add-event-btn");

// Get the offset position of the navbar
var sticky = addEventBtn.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function addSticky() {
  if (window.pageYOffset >= sticky) {
    addEventBtn.classList.add("sticky")
  } else {
    addEventBtn.classList.remove("sticky");
  }
}
// end of posistion sticky==========================

// event timeline stuff event boxes

function createTimelineElement(event) {
  let $parentDiv  = $('<div>');
    $parentDiv.addClass("cd-timeline-block");
  let $childDiv = $('<div>');
    $childDiv.addClass("cd-timeline-img cd-picture");
  let $iconImage = $('<img>');
    $iconImage.attr('src', '../' + event.imageurl);
  let $timelineContent = $('<div>');
    $timelineContent.addClass('cd-timeline-content');
  let $titleSection = $('<h2>');
    $titleSection.text(event.title);
  let $paragraph = $('<p>');
    $paragraph.text(event.story);
  let dateFormatted = moment(event.date).format("MMM Do YY");    
  let $date = $('<span>');
    $date.addClass('cd-date');
    $date.text(dateFormatted);

   $parentDiv.append($childDiv);
   $childDiv.append($iconImage);
   $parentDiv.append($timelineContent);
   $timelineContent.append($titleSection, $paragraph, $date);

    return $parentDiv; 
}
