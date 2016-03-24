GalleryApplication.module("App", function(App, GalleryApplication, Backbone, Marionette, $, _) {
  App.AlbumModel = Backbone.Model.extend();
  App.AlbumsCollection = Backbone.Collection.extend({
    model: App.AlbumModel,
    url: function() {
      return baseUrl + 'api';
    }
  });
  App.AlbumDetailsModel = Backbone.Model.extend({
    url: function() {
      return baseUrl + 'api/' + this.id + '/' + this.attributes.page;
    }
  });
  return App.ImageModel = Backbone.Model.extend();
});
