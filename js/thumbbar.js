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
      thumbbarViever = new OpenSeadragon({
        id : this.thumbviewerID,
        panVertical : false,
        panHorizontal: true,
        visibilityRatio: 1,
        maxZoomLevel: 1,
        showNavigator:          false,
        showNavigationControl:  false,
        constrainDuringPan: true,
      });
      thumbbarViever.canvas.style.backgroundColor = "#2D2D2D";
      imgSrcLength = this.imageSource.length;
      console.log(imgSrcLength);
      for(i=0; i < imgSrcLength; i++){
          console.log(this.imageSource[i]);
        thumbbarViever.addTiledImage({
            tileSource: this.imageSource[i],
            index: i,
            opacity : 1,
             x: -i,
             height: 1,
        });
      }
      // var  tiledImage;
      //thumbbarViever.open(this.imageSource);
      // thumbbarViever.world.arrange({rows:1,
      //   immediately : true,
      //   layout : "horizontal",
      // });
      //thumbbarViever.world.draw();
      thumbbarViever.innerTracker.scrollHandler=false;
      var count = thumbbarViever.world.getItemCount();
      console.log("Count = " + count);
      // for (i = 0; i < count; i++) {
      //   tiledImage = thumbbarViever.world.getItemAt(i);
      //   tiledImage.setPosition(new OpenSeadragon.Point(i, 0));
      // }
      self.showControls();
      thumbbarViever.addHandler('canvas-click', function(event) {
          self.setImageMain(event);
          if (!event.quick) {

              return;
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
        width = "25px";
        height = "100%";
        //console.log("Viewer inside showControls : "+ thumbbarViever.element);
        leftControlButton = $.makeNeutralElement("div");
        this.thumbbarDiv.appendChild(leftControlButton);
        leftControlButton.id = "thumbbarControlLeft";
        leftControlButton.style.width = width;
        leftControlButton.style.height = height;
        leftControlButton.style.position = "absolute";
        leftControlButton.style.top = 0;
        leftControlButton.style.left = 0;
        leftControlButton.style.backgroundColor = "rgba(233, 233, 233, 0.1)";
        leftControlButton.style.zIndex = "99999";
        leftControlArrow = $.makeNeutralElement("div");
        leftControlButton.appendChild(leftControlArrow);
      },
      setImageMain : function(event){
        console.log("inside setImageMain");
        var index =   self.getImagePosition(thumbbarViever.viewport.pointFromPixel(event.position));
        console.log("inside setImageMain index: " + index);
        if (index !== -1) {
            thumbbarViever.viewport.fitBounds(thumbbarViever.world.getItemAt(index).getBounds());
            this.mainViewer.goToPage(index);
        }
      },
      getImagePosition : function(position){
        console.log("inside getImagePosition " + position);
        var box;
        var count = thumbbarViever.world.getItemCount();
        for (var i = 0; i < count; i++) {
            box = thumbbarViever.world.getItemAt(i).getBounds();
            if (position.x > box.x &&
                    position.y > box.y &&
                    position.x < box.x + box.width &&
                    position.y < box.y + box.height) {
                        console.log("inside getImagePosition i =" + i);
                return i;
            }
        }

        return -1;
      },
  }

})(OpenSeadragon);
