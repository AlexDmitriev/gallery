GalleryApplication.module("App", function(App, GalleryApplication, Backbone, Marionette, $, _){

    App.AlbumModel = Backbone.Model.extend();

    App.AlbumsCollection = Backbone.Collection.extend({
        model: App.AlbumModel,
        url: '/app_dev.php/api'
    });

    App.AlbumDetailsModel = Backbone.Model.extend({
        url: function() {
            return '/app_dev.php/api/' + this.id + '/' + this.attributes.page;
        }
    });

    App.ImageModel = Backbone.Model.extend();

});