GalleryApplication.module("App", function(App, GalleryApplication, Backbone, Marionette, $, _){

    App.LoaderView = Marionette.ItemView.extend({
        template: "#loader-template"
    });

    App.AlbumsView = Marionette.CollectionView.extend({
        getChildView: function(){
            return App.AlbumView
        }
    });

    App.AlbumView = Marionette.ItemView.extend({
        template: "#albums-item-template",
        events:  {
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
            "click a.js-close": function(e){
                e.preventDefault();
                GalleryApplication.trigger("image:close");
            }
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