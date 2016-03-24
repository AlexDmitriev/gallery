GalleryApplication.module "App", (App,GalleryApplication, Backbone, Marionette, $, _) ->
  albums = []

  App.Controller = Marionette.Controller.extend(
    home: ()->
      if albums.length == 0
        albums = new App.AlbumsCollection()
        App.appLayout.getRegion('body').show new App.LoaderView()
        albums.fetch().done ()->
          App.appLayout.getRegion('body').show new App.AlbumsView
            collection: albums
          return
        return
      else
        App.appLayout.getRegion('body').show new App.AlbumsView
          collection: albums
         return

    album: (id, page)->
      page || page = 1
      album = new App.AlbumDetailsModel
        id: id
        page: page

      App.appLayout.getRegion('body').show new App.LoaderView()
      album.fetch
        success: ()->
          App.appLayout.getRegion('body').show new App.AlbumDetailsView
            model: album
          return
        error: ()->
          App.appLayout.getRegion('body').show new App.ErrorView()
          return
      return
  )

  GalleryApplication.on "image:show", (image)->
    App.appLayout.getRegion('image').show new App.ImageView
      model: new App.ImageModel
        image: image
    return

  GalleryApplication.on "image:close", (image)->
    App.appLayout.getRegion('image').reset()
    return

  GalleryApplication.on "album:show", (model)->
    GalleryApplication.navigate "album/" + model.get 'id'
    return

  return

