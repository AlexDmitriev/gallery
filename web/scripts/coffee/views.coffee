GalleryApplication.module "App", (App,GalleryApplication, Backbone, Marionette, $, _) ->
  App.LoaderView = Marionette.ItemView.extend
    template: "#loader-template"

  App.ErrorView = Marionette.ItemView.extend
    template: "#error-template"

  App.AlbumsView = Marionette.CollectionView.extend
    getChildView: ()->
      App.AlbumView

  App.AlbumView = Marionette.ItemView.extend
    template: "#albums-item-template"

    events:
      "click a.js-show-album": "showAlbum",
      "click a.js-show-image": "showImage"

     showImage: (e)->
       e.preventDefault()
       GalleryApplication.trigger "image:show", $(e.currentTarget).attr "href"
       return

     showAlbum: (e)->
       e.preventDefault()
       GalleryApplication.navigate "album/" + this.model.get('id'), true;
       return


  App.AlbumDetailsView = Marionette.ItemView.extend
    template: "#albums-details-template"
    events:
      "click a.js-back-to-albums": "backToAlbumsClicked"
      "click a.js-show-album-page": "showAlbumPage"
      "click a.js-show-image": "showImage"

    backToAlbumsClicked: (e)->
      e.preventDefault()
      GalleryApplication.navigate "", true
      return

    showImage: (e)->
      e.preventDefault()
      GalleryApplication.trigger "image:show", $(e.currentTarget).attr "href"
      return

    showAlbumPage: (e)->
      e.preventDefault()
      GalleryApplication.navigate "album/" + this.model.get('id') + "/" + $(e.currentTarget).attr("page"), true
      return


  App.ImageView = Marionette.ItemView.extend
    template: "#album-image-template"

    events:
      "click a.js-close": "close"

    close: (e)->
      e.preventDefault()
      GalleryApplication.trigger "image:close"


  App.LayoutView = Marionette.LayoutView.extend
    template: "#gallery-template"

    regions:
      image: "#image-block"
      body: "#body-block"


  App.appLayout = new App.LayoutView()
  GalleryApplication.mainRegion.show App.appLayout;

  return
