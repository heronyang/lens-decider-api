
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("getAmountInfo", function(request, response) {
  var query = new Parse.Query("FlickrGroup");
  query.find({
      success: function(results) {
        resultJson = []
        for(var i = 0; i < results.length; i++) {
          resultJson.push(results[i].get("name").toJSON());
        }
        response.success(resultJson);
      },
      error: function() {
        response.error("FlickrGroup lookup failed");
      }
  });
});

Parse.Cloud.define("getPhotosOfGroup", function(request, response) {
  var query = new Parse.Query("FlickrGroup");
  query.equalTo("flickrId", request.params.flickrId);
  query.find({
      success: function(results) {
        var r = results[0].relation("photos");
        r.query().find({
            success: function(photos){
              response.success(photos); //list of trophies pointed to by that player's "trophies" column.
            },
            error: function(error){
              response.error(error);
            }
        })
      },
      error: function() {
        response.error("FlickrGroup lookup failed");
      }
  });
});
