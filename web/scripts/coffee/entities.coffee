GalleryApplication.module "App", (App,GalleryApplication, Backbone, Marionette, $, _) ->
  App.AlbumModel = Backbone.Model.extend()

  App.AlbumsCollection = Backbone.Collection.extend(
    model: App.AlbumModel
    url: ()->
      baseUrl + 'api'
  )

  App.AlbumDetailsModel = Backbone.Model.extend(
    url: () ->
      baseUrl + 'api/' + this.id + '/' + this.attributes.page
  )

  App.ImageModel = Backbone.Model.extend()
