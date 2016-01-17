var _ = require('underscore');

Parse.Cloud.define("getAmountOfGroup", function(request, response) {

  var query = new Parse.Query("FlickrGroup");
  query.equalTo("flickrId", request.params.flickrId);

  query.first().then(function(group) {

    var queryOfPhotos = group.relation("photos").query();

    queryOfPhotos.count().then(function(amount){
      response.success(amount);
    }, function(error) {
      response.error("getAmountOfGroup: can't get count");
    });

  }, function(error) {

    console.log(error);
    response.error("getAmountOfGroup can't get query of such group");

  });

});

Parse.Cloud.define("getPhotosOfGroup", function(request, response) {

  var query = new Parse.Query("FlickrGroup");
  query.equalTo("flickrId", request.params.flickrId);

  query.first().then(function(group) {

    var queryOfPhotos = group.relation("photos").query();
    return queryOfPhotos.find();

  }).then(function(photos){

    response.success(formatDataForResponse(photos));

  }, function(error) {

    console.log(error);
    response.error("getAmountOfGroup can't get query of such group");

  });

});

function formatDataForResponse(photos) {

  photos.sort( function() { return 0.5 - Math.random() } );
  return photos.slice(0, 20);

}
