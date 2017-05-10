$(document).ready(function(){
  // everything goes below this!

  // set up our apiURL and our apiKey - you will want to
  // replace this with your own key
  var apiurl = "https://api.phila.gov/airport-parking/v1/";
  // create a function for if our ajax call succeeds :) !
  // we use the var functionName = function(){} format
  // this is ALMOST the same as doing
  // function updatePage(resp){}
  // but has some implications with regards to scope
  // http://stackoverflow.com/questions/336859/var-functionname-function-vs-function-functionname

  var updatePage = function( resp ) {
    console.log(resp);
  //  $('.parking-content').append('<h3>'+.display_name+'</h3>');

    $.each(resp.garages,function(key,movie){
      //$('#content').append(`<div class="movie movie${key}"><section class="poster"></section><section class="movie-info"></section></div>`);
      console.log(movie);

//if there are 0 spaces, class=full   varclass
var fullClass = "full";
  if (movie.spaces_available < 100) {
    fullClass = "full";
  } else if (movie.spaces_available < 20) {
    fullClass = "almostempty";
  }
   else {
    fullClass = "empty";
  }
      var theoutput = '<div class="'+fullClass+'"><h2>'+movie.display_name+'</h2>';
      theoutput += '<p>'+'<h3>'+'Spaces Available ='+'</h3>'+' '+Math.floor(movie.spaces_available)+'</p>';
      theoutput += '<p>'+'<h3>'+'Total Space ='+'</h3>'+' '+movie.total_spaces+'</p>';
      theoutput += '<p>'+movie.lat+'</p>';
      theoutput += '<p>'+movie.lng+'</p>';
      theoutput += '<p>'+movie.type+'</p>';
      theoutput += '</div>';
      var map;
          function initMap() {
            var measure = {lat: -34.397, lng: 150.644};
            var map = new google.maps.Map(document.getElementById('map'), {
              center: measure,
              zoom: 8
            });
            var mark = new google.maps.Marker({
              position: measure,
              map: map
            });
          }
    //  $(movie.lat.lng).append()
      if (fullClass == "full") {
        $('.no').append(theoutput);
      }
      else if (fullClass == "empty") {
        $('.yes').append(theoutput);
      }
      //$(`.movie${key} .movie-info`).append('<h3>'+movie.title+'</h3>');
      //$(`.movie${key} .movie-info`).append('<p>'+movie.overview+'</p>');
      //$(`.movie${key} .poster`).append('<img src="https://image.tmdb.org/t/p/w500'+movie.poster_path+'" height="250px">');


    });



//http://www.birdtheme.org/useful/v3tool.html

  };

  // create a function for if our ajax call fails :( !
  var ajaxFailed = function( req, status, err ){
    console.log('something went wrong', status , err );
  };

  // set up the ajax options!
  var ajaxOptions = {
    url: apiurl,
    dataType: 'json',
    success: updatePage,
    error: ajaxFailed
  };

  // now, the good stuff!  Run the ajax call!
  $.ajax(ajaxOptions);


  // and above this!  Don't delete anything below here!
});
