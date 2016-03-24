GalleryApplication.module "App", (App,GalleryApplication, Backbone, Marionette, $, _) ->
  App.Router = Marionette.AppRouter.extend(
    appRoutes:
      "": "home",
      "album/:id": "album"
      "album/:id/:page": "album"
      "app_dev.php": "home"
      "app_dev.php/album/:id": "album"
      "app_dev.php/album/:id/:page": "album"
    controller: new App.Controller()
  )

  App.on "start", ()->
    new App.Router()
    return
  return
