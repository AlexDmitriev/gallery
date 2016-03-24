GalleryApplication.module("App", function(App, GalleryApplication, Backbone, Marionette, $, _) {
  var albums;
  albums = [];
  App.Controller = Marionette.Controller.extend({
    home: function() {
      if (albums.length === 0) {
        albums = new App.AlbumsCollection();
        App.appLayout.getRegion('body').show(new App.LoaderView());
        albums.fetch().done(function() {
          App.appLayout.getRegion('body').show(new App.AlbumsView({
            collection: albums
          }));
        });
      } else {
        App.appLayout.getRegion('body').show(new App.AlbumsView({
          collection: albums
        }));
      }
    },
    album: function(id, page) {
      var album;
      page || (page = 1);
      album = new App.AlbumDetailsModel({
        id: id,
        page: page
      });
      App.appLayout.getRegion('body').show(new App.LoaderView());
      album.fetch({
        success: function() {
          App.appLayout.getRegion('body').show(new App.AlbumDetailsView({
            model: album
          }));
        },
        error: function() {
          App.appLayout.getRegion('body').show(new App.ErrorView());
        }
      });
    }
  });
  GalleryApplication.on("image:show", function(image) {
    App.appLayout.getRegion('image').show(new App.ImageView({
      model: new App.ImageModel({
        image: image
      })
    }));
  });
  GalleryApplication.on("image:close", function(image) {
    App.appLayout.getRegion('image').reset();
  });
  GalleryApplication.on("album:show", function(model) {
    GalleryApplication.navigate("album/" + model.get('id'));
  });
});
