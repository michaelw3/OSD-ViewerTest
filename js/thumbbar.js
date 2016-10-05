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
  //         this.thumbbarInstanceInstance = new $.Thumbbar(options);
  //     } else {
  //     }
  // };
   $.Thumbbar = function(options){
      self = this;
      this.position = options.position;
      this.mainViewer = options.mainviewer;
      this.mainViewerPosition = $.getElementPosition(this.mainViewer.element);
      this.mainViewerSize = $.getElementSize(this.mainViewer.element);
      this.imageSource = this.mainViewer.tileSources;
      this.thumbviewerID = options.id;
      this.thumbbarDiv = document.getElementById(this.thumbviewerID);
      console.log(this.thumbviewerID);

      self.setPosition(this.position);
      var thumbbarViever = new OpenSeadragon({
        id : this.thumbviewerID,
        minZoomLevel: 	1,
        maxZoomLevel: 	1,
        panVertical: true,
        showNavigator:          false,
        mouseNavEnabled:        false,
        showNavigationControl:  false,
        showSequenceControl:    false,
      });
      thumbbarViever.addTiledImage({
          tileSource: this.imageSource,
          x: 5,
          y: 0,
          width: 10
      });
    //  viewerDiv = document.getElementById(options.mainviewer.id);
    //  console.log(viewerDiv);
    //  mainBottom = this.getBottom(viewerDiv);
    //  console.log("positon bottom of mainviewer = " + mainBottom);
   }
   $.Thumbbar.prototype = {
      getBottom : function(elem) {
        var rect = elem.getBoundingClientRect();
        return rect.bottom;
      },
      setPosition : function(options){
        console.log(this.thumbbarDiv);
        if(options === "bottom"){
          leftTop = {x : this.mainViewerPosition.x , y : (this.mainViewerPosition + this.mainViewerSize.y)};
          this.thumbbarDiv.style.width = this.mainViewerSize.x;
          this.thumbbarDiv.style.height = "100px";
          this.thumbbarDiv.style.position = "relative";
          this.thumbbarDiv.style.top = leftTop.y;
          this.thumbbarDiv.style.left = leftTop.x;
          this.thumbbarDiv.style.backgroundColor = "green";
          console.log(leftTop);
        }
      }

   }


})(OpenSeadragon);
