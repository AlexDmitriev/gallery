var GalleryApplication;

GalleryApplication = new Marionette.Application();

GalleryApplication.navigate = function(route, options) {
  options || (options = {});
  Backbone.history.navigate(route, options);
};

GalleryApplication.getCurrentRoute = function() {
  return Backbone.history.fragment;
};

GalleryApplication.addRegions({
  mainRegion: "#main-region"
});

GalleryApplication.on('start', function() {
  if (Backbone.history) {
    Backbone.history.start({
      pushState: true,
      root: baseUrl
    });
  }
});

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

GalleryApplication.module("App", function(App, GalleryApplication, Backbone, Marionette, $, _) {
  App.LoaderView = Marionette.ItemView.extend({
    template: "#loader-template"
  });
  App.ErrorView = Marionette.ItemView.extend({
    template: "#error-template"
  });
  App.AlbumsView = Marionette.CollectionView.extend({
    getChildView: function() {
      return App.AlbumView;
    }
  });
  App.AlbumView = Marionette.ItemView.extend({
    template: "#albums-item-template",
    events: {
      "click a.js-show-album": "showAlbum",
      "click a.js-show-image": "showImage"
    },
    showImage: function(e) {
      e.preventDefault();
      GalleryApplication.trigger("image:show", $(e.currentTarget).attr("href"));
    },
    showAlbum: function(e) {
      e.preventDefault();
      GalleryApplication.navigate("album/" + this.model.get('id'), true);
    }
  });
  App.AlbumDetailsView = Marionette.ItemView.extend({
    template: "#albums-details-template",
    events: {
      "click a.js-back-to-albums": "backToAlbumsClicked",
      "click a.js-show-album-page": "showAlbumPage",
      "click a.js-show-image": "showImage"
    },
    backToAlbumsClicked: function(e) {
      e.preventDefault();
      GalleryApplication.navigate("", true);
    },
    showImage: function(e) {
      e.preventDefault();
      GalleryApplication.trigger("image:show", $(e.currentTarget).attr("href"));
    },
    showAlbumPage: function(e) {
      e.preventDefault();
      GalleryApplication.navigate("album/" + this.model.get('id') + "/" + $(e.currentTarget).attr("page"), true);
    }
  });
  App.ImageView = Marionette.ItemView.extend({
    template: "#album-image-template",
    events: {
      "click a.js-close": "close"
    },
    close: function(e) {
      e.preventDefault();
      return GalleryApplication.trigger("image:close");
    }
  });
  App.LayoutView = Marionette.LayoutView.extend({
    template: "#gallery-template",
    regions: {
      image: "#image-block",
      body: "#body-block"
    }
  });
  App.appLayout = new App.LayoutView();
  GalleryApplication.mainRegion.show(App.appLayout);
});

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

GalleryApplication.module("App", function(App, GalleryApplication, Backbone, Marionette, $, _) {
  App.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "": "home",
      "album/:id": "album",
      "album/:id/:page": "album",
      "app_dev.php": "home",
      "app_dev.php/album/:id": "album",
      "app_dev.php/album/:id/:page": "album"
    },
    controller: new App.Controller()
  });
  App.on("start", function() {
    new App.Router();
  });
});
