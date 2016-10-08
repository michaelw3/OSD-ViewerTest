(function($){

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
      thumbbarViewer = new OpenSeadragon({
        id : this.thumbviewerID,
        panVertical : false,
        panHorizontal: true,
        visibilityRatio: 1,
        maxZoomLevel: 1,
        showNavigator:          false,
        showNavigationControl:  false,
        constrainDuringPan: false,
        gestureSettingsMouse :{clickToZoom : false, dblClickToZoom: false},
        gestureSettingsTouch :{pinchToZoom : false, scrollToZoom: false, dblClickToZoom: false},
      });
      thumbbarViewer.canvas.style.backgroundColor = "#2D2D2D";
      imgSrcLength = this.imageSource.length;
      console.log(imgSrcLength);
      for(i=0; i < imgSrcLength; i++){
          console.log(this.imageSource[i]);
        thumbbarViewer.addTiledImage({
            tileSource: this.imageSource[i],
            index: i,
            opacity : 1,
             x: -i,
             height: 1,
        });
      }
      thumbbarViewer.innerTracker.scrollHandler=false;

      self.showControls();
      thumbbarViewer.addHandler('canvas-click', function(event) {
          if (event.quick) {
              self.setImageMain(event);
          }
        });
   }
   $.Thumbbar.prototype = {
      setPosition : function(options){
        console.log(this.thumbbarDiv);
        switch (options) {
          case "bottom":
            leftTop = {x : this.mainViewerPosition.x , y : (this.mainViewerPosition + this.mainViewerSize.y)};
            this.thumbbarDiv.style.width = this.mainViewerSize.x;
            this.thumbbarDiv.style.height = "100px";
            this.thumbbarDiv.style.position = "relative";
            this.thumbbarDiv.style.top = leftTop.y;
            this.thumbbarDiv.style.left = leftTop.x;
            console.log(leftTop);
            break;
          case "left":
            break;
          case "right":
            break;
        }
      },
      showControls : function(){
        width = "30px";
        height = "100%";
        leftControlButton = $.makeNeutralElement("div");
        this.thumbbarDiv.appendChild(leftControlButton);
        leftControlButton.id = "thumbbarControlLeft";
        leftControlButton.style.width = width;
        leftControlButton.style.height = height;
        leftControlButton.style.position = "absolute";
        leftControlButton.style.top = 0;
        leftControlButton.style.left = 0;
        leftControlButton.style.backgroundColor = "rgba(233, 233, 233, 0.3)";
        leftControlButton.style.zIndex = "99999";
        leftControlArrow = $.makeNeutralElement("img");
        leftControlButton.appendChild(leftControlArrow);
        leftControlArrow.src ="js/left-arrow.png";
        leftControlArrow.style.position = "relative";
        leftControlArrow.style.left = "5px";
        leftControlArrow.style.top = "37%";
      },
      setImageMain : function(event){
        console.log("inside setImageMain");
        var index =   self.getImagePosition(thumbbarViewer.viewport.pointFromPixel(event.position));
        console.log("inside setImageMain index: " + index);
        if (index !== -1) {
            thumbbarViewer.viewport.fitBounds(thumbbarViewer.world.getItemAt(index).getBounds());
            this.mainViewer.goToPage(index);
        }
      },
      getImagePosition : function(position){
        var box;
        var count = thumbbarViewer.world.getItemCount();
        for (var i = 0; i < count; i++) {
            box = thumbbarViewer.world.getItemAt(i).getBounds();
            if (position.x > box.x &&
                    position.y > box.y &&
                    position.x < box.x + box.width &&
                    position.y < box.y + box.height) {
                return i;
            }
        }

        return -1;
      },
      scrollLeft : function(){

      },
      scrolRight : function(){

      },
      scrollToThumb : function(index){
        position =  thumbbarViewer.world.getItemAt(index).getBounds().getCenter();
        thumbbarViewer.viewport.panTo(position, true);
      },

  }

})(OpenSeadragon);
