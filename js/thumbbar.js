(function($){

  // if (!$.version || $.version.major < 2) {
  //     throw new Error('This version of OpenSeadragonScalebar requires ' +
  //             'OpenSeadragon version 2.0.0+');
  // }
  //
  // $.prototype.thumbbar = function(options) {
  //     if (!this.thumbbarInstance) {
  //         options = options || {};
  //         options.viewer = this;
  //         this.thumbbarInstanceInstance = new $.thumbbar(options);
  //     } else {
  //     }
  // };
   $.thumbbar = function(options){
     console.log("id = " + options.id);
     console.log("mainviewer id = " + options.mainviewer.id);
     viewerDiv = document.getElementById(options.mainviewer.id);
     console.log(viewerDiv);
     mainBottom = this.getBottom(viewerDiv);
     console.log("positon bottom of mainviewer = " + mainBottom);
   }
   $.thumbbar.prototype = {
      getBottom : function(elem) {
        var rect = elem.getBoundingClientRect();
        return rect.bottom;
    }
   }
})(OpenSeadragon);
