$(document).ready(function(){
var Instagram = {};
Instagram.Template = {};

$(function(){
	//Bind an event handler to the 'click' event on the form's button
	$('form#search button').click(function(){
		//Extract the value of the search input text field
		var tag = $('input.search-tag').val();

		//Invoke 'search', passing 'tag'
		Instagram.search(tag);
	});

});

//A very simple function for template parsing
Instagram.Template.generate = function(template, photo){
	//Define variable for regular expression
	var re;

	//fetch template <-- Do I need this line???
	//template = Instagram.Template.Views[template];

	//loop through the passed photo object
	for(var attribute in photo){
		//generate a regular expression???
		re = new RegExp("{"+attribute+"}","g");

		//Apply the regular expression instance with 'replace'
		template = template.replace(re ,photo[attribute]);
	}

	return template;
};

function toTemplate(photo){
	photo = {
		like_count: photo.likes.count,
		avatar_url: photo.user.profile_picture,
		photo_url: photo.images.low_resolution.url,
		url: photo.link
	};
	
	return Instagram.Template.generate(Instagram.Template.Views["photo"], photo);
};

// HTML markup goes here, please!
Instagram.Template.Views = {

  "photo": "<div class='photo'>" +
            "<a href='{url}' target='_blank'><img class='main' src='{photo_url}' width='250' height='250' /></a>" +
            "<img class='avatar_url' width='40' height='40' src='{avatar}' />" +
            "<span class='heart'><strong>{like_count}</strong></span>" +
          "</div>"
};

(function(){

  function toScreen(photos){
    $.each(photos.data, function(index, photo){

      // Undefined function toTemplate, takes
      // the photo object and returns markup
      // ready for display.

      photo = toTemplate(photo);
      - $('div#photos-wrap').append(photo);
      + $('div#photos-wrap').prepend(photo);

    });
  }

  function search(tag){
    var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&client_id=a307c0d0dada4b77b974766d71b72e0e";
    $.getJSON(url, toScreen);
  }


  Instagram.search = search;
})();

Instagram.search('cats');


});














