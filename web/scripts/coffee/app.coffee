GalleryApplication = new Marionette.Application()

GalleryApplication.navigate = (route, options)->
  options || options = {}
  Backbone.history.navigate(route, options)
  return

GalleryApplication.getCurrentRoute = ()->
  Backbone.history.fragment

GalleryApplication.addRegions
  mainRegion: "#main-region"

GalleryApplication.on 'start', ()->
  if Backbone.history
    Backbone.history.start({pushState: true,root: baseUrl})
  return
