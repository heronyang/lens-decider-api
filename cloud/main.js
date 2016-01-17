
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("1/hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("1/getPhotosOfGroup", function(request, response) {
  var query = new Parse.Query("FlickrGroup");
  query.equalTo("name", request.params.groupName);
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
