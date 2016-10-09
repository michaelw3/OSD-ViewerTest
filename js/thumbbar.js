
/*
 * Copyright (c) 2016 Michael Werner
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
*
*@author Michael Werner <mikew3@yahoo.com>
*/
(function($){

var mousedownID = -1;
var scrollPosition;
var focusedImagePosition;

  $.ThumbbarControl = {
    LEFT : 0,
    RIGHT : 1,
    UP : 2,
    DOWN : 3
  };

  $.ThumbbarPosition = {
    TOP : 0,
    BOTTOM : 1,
    LEFT : 2,
    RIGHT : 3
  };

  $.ThumbbarDir = {
    RTL : "RTL",
    LTR : "LTR"
  }
   $.Thumbbar = function(options){
      options = options || {};
      self = this;
      this.direction = options.direction || $.ThumbbarDir.LTR;
      this.position = options.position;
      this.mainViewer = options.mainviewer;
      this.mainViewerPosition = $.getElementPosition(this.mainViewer.element);
      this.mainViewerSize = $.getElementSize(this.mainViewer.element);
      this.imageSource = this.mainViewer.tileSources;
      this.thumbviewerID = options.id;
      this.thumbbarDiv = document.getElementById(this.thumbviewerID);
      this.backgroundClr =  options.backgrounColor || "#2D2D2D";
      this.imgSrcLength = this.imageSource.length;
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
      thumbbarViewer.canvas.style.backgroundColor = this.backgroundClr;

      for(i=0; i < this.imgSrcLength; i++){
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
              setImageMain(event);
          }
        });
      thumbbarViewer.addHandler('pan', function(e){
        focusedImagePosition = e.center;
        console.log(e);
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
      showControls : function(options){
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
        leftControlButton.style.cursor = "pointer";
        leftControlButton.addEventListener("mousedown",function(e){
            mousedown(e);
            scrollPosition = $.ThumbbarControl.LEFT;
        });
        leftControlButton.addEventListener("mouseup", function(e){
            mouseup(e);
            scrollPosition = "";
        });
        //Also clear the interval when user leaves the window with mouse
        leftControlButton.addEventListener("mouseout", function(e){
            mouseup(e);
            scrollPosition = "";
        });
        leftControlArrow = $.makeNeutralElement("img");
        leftControlButton.appendChild(leftControlArrow);
        leftControlArrow.src ="js/left-arrow.png";
        leftControlArrow.style.position = "relative";
        leftControlArrow.style.left = "5px";
        leftControlArrow.style.top = "37%";
        //right control
        rightControlButton = $.makeNeutralElement("div");
        this.thumbbarDiv.appendChild(rightControlButton);
        rightControlButton.id = "thumbbarControlRight";
        rightControlButton.style.width = width;
        rightControlButton.style.height = height;
        rightControlButton.style.position = "absolute";
        rightControlButton.style.top = 0;
        rightControlButton.style.right = 0;
        rightControlButton.style.backgroundColor = "rgba(233, 233, 233, 0.3)";
        rightControlButton.style.zIndex = "99999";
        rightControlButton.style.cursor = "pointer";
        rightControlButton.addEventListener("mousedown",function(e){
            mousedown(e);
            scrollPosition = $.ThumbbarControl.RIGHT;
        });
        rightControlButton.addEventListener("mouseup", function(e){
            mouseup(e);
            scrollPosition = "";
        });
        //Also clear the interval when user leaves the window with mouse
        rightControlButton.addEventListener("mouseout", function(e){
            mouseup(e);
            scrollPosition = "";
        });
        rightControlArrow = $.makeNeutralElement("img");
        rightControlButton.appendChild(rightControlArrow);
        rightControlArrow.src ="js/right-arrow.png";
        rightControlArrow.style.position = "relative";
        rightControlArrow.style.right = 0;
        rightControlArrow.style.top = "37%";
      },
      showThumbIndex : function(options){

      },

      scrollToThumb : function(index){
        console.log("focusedImagePosition: " +focusedImagePosition);
        position =  thumbbarViewer.world.getItemAt(index).getBounds().getCenter();
        thumbbarViewer.viewport.panTo(position, false);
      },

  }

  function getCurrentIndex(){

    return thumbbarViewer.currentPage();
  }

  function mousedown(event) {
    if(mousedownID==-1)  //Prevent multimple loops!
       mousedownID = setInterval(scrollOnControlClick, 100 /*execute every 100ms*/);


  }
  function mouseup(event) {
     if(mousedownID!=-1) {  //Only stop if exists
       clearInterval(mousedownID);
       mousedownID=-1;
     }

  }
function scrollOnControlClick(){
  scrollLeft = (self.direction == $.ThumbbarDir.RTL)? new $.Point(focusedImagePosition.x -1,focusedImagePosition.y) : new $.Point(focusedImagePosition.x +1,focusedImagePosition.y);
  scrollRight = (self.direction == $.ThumbbarDir.RTL)? new $.Point(focusedImagePosition.x +1,focusedImagePosition.y) : new $.Point(focusedImagePosition.x -1,focusedImagePosition.y);
  console.log("controlClick fired");
  currentIndex = getImagePosition(focusedImagePosition);
  var nextIndex;
  if((self.direction == $.ThumbbarDir.RTL && scrollPosition == $.ThumbbarControl.LEFT) || (self.direction == $.ThumbbarDir.LTR && scrollPosition == $.ThumbbarControl.RIGHT){
    nextIndex +=1;
  }
  if((self.direction == $.ThumbbarDir.LTR && scrollPosition == $.ThumbbarControl.LEFT) || (self.direction == $.ThumbbarDir.RTL && scrollPosition == $.ThumbbarControl.RIGHT)){
    nextIndex -=1;
  }
  console.log("scrollPosition : " + scrollPosition);
  console.log("currentIndex : "+currentIndex + " typeof - "+typeof(currentIndex));
  if(scrollPosition == $.ThumbbarControl.LEFT && (nextIndex < self.imgSrcLength &&  self.direction == $.ThumbbarDir.RTL)
  || (nextIndex > 0 && self.direction == $.ThumbbarDir.LTR) ){
    console.log("panning to : " + nextIndex);
      panToImage(scrollLeft);
  }
  if(scrollPosition == $.ThumbbarControl.RIGHT && (nextIndex > 0 && self.direction == $.ThumbbarDir.RTL) ||
   (nextIndex < self.imgSrcLength &&  self.direction == $.ThumbbarDir.LTR) ){
    console.log("panning to : " + nextIndex);
      panToImage(scrollRight);
  }
}

function panToImage(position){
  //position =  thumbbarViewer.world.getItemAt(index).getBounds().getCenter();
  //console.log("position : "+position);
  //thumbbarViewer.viewport.fitBounds(thumbbarViewer.world.getItemAt(index).getBounds());
  thumbbarViewer.viewport.panTo(position, false);
}

function setImageMain(event){
    var index =   getImagePosition(thumbbarViewer.viewport.pointFromPixel(event.position));
    console.log("inside setImageMain index: " + index);

    if (index !== -1) {
        thumbbarViewer.viewport.fitBounds(thumbbarViewer.world.getItemAt(index).getBounds());
        self.mainViewer.goToPage(index);
    }
  }

function   getImagePosition(position){
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
  }

})(OpenSeadragon);
