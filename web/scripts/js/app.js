var GalleryApplication = new Marionette.Application();

/* Navigation helper */
GalleryApplication.navigate = function(route, options){
    options || (options = {});
    Backbone.history.navigate(route, options);
};

GalleryApplication.getCurrentRoute = function(){
    return Backbone.history.fragment
};


GalleryApplication.addRegions({
    mainRegion: "#main-region"
});

GalleryApplication.on('start', function(){
    if (Backbone.history) {
        Backbone.history.start({pushState: true, root: baseUrl});
    }

    console.log(GalleryApplication.getCurrentRoute())
});

