$(document).ready(function(){
var Instagram = {};

function toScreen(photos){
	//Using jQuery's generic iterator function:
	//jQuery.each 
	$.each(photos.data, function(index, photo){
		photo = "<img src='"+ photo.images.low_resolution.url + "' />";

		$('div#photos-wrap').append(photo);
	});
}

(function(){
	function search(tag){
		var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=XXXXXXXXX"
		$.getJSON(url,toScreen);
		console.log(tag);
	}

	Instagram.search = search;
})();

Instagram.search('cats');

});

