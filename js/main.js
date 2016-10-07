imgArr = ["/manu3555/dziMS003555_000_COVER_FRONT.xml",
        "/manu3555/dziMS003555_001b.xml",
        "/manu3555/dziMS003555_002a.xml",
        "/manu3555/dziMS003555_002b.xml",
        "/manu3555/dziMS003555_003a.xml",
        "/manu3555/dziMS003555_003b.xml",
        "/manu3555/dziMS003555_004a.xml",
        "/manu3555/dziMS003555_004b.xml",
        "/manu3555/dziMS003555_005b.xml",];
var viewer = OpenSeadragon({
      id: "openseadragon",
      //smoothTileEdgesMinZoom: 1,
      zoomInButton:     "zoominbttn",
      zoomOutButton:    "zoomoutbttn",
      homeButton:       "homebttn",
      //  fullPageButton: "fullscrnbttn",
      //  visibilityRatio: 2.0,
      //  constrainDuringPan: true,
      minZoomImageRatio:  1,
      maxZoomPixelRatio:  1,
      nextButton:         "nextbttn",
      previousButton:     "previousbttn",
      tileSources:        imgArr,
      sequenceMode:       true,
      //showReferenceStrip: true,
      //prefixUrl: "/openseadragon/images/",
  });
  viewer.canvas.style.backgroundColor = "#2D2D2D";
  //for thumbbar.js
var thumbViewer = new OpenSeadragon.Thumbbar({id: "thumbbar",
    mainviewer : viewer,
    position : "bottom",
});
var sumOfPages = imgArr.length;
document.getElementById("currentpage").innerHTML = "1" + " of " + sumOfPages;
//page handler
viewer.addHandler("page", function (data) {

      document.getElementById("currentpage").innerHTML = ( parseInt(data.page) + 1 ) + " of " + sumOfPages;
});

// toggle fullscreen
toggleFullScreen = function(){
  viewerContainer = document.getElementById("viewercontainer");
  if (!document.webkitFullscreenElement) {
     viewerContainer.webkitRequestFullscreen();
 } else {
   if (document.webkitExitFullscreen) {
     document.webkitExitFullscreen();
   }
 }
}
fllscrnbttn = document.getElementById("fullscrnbttn");
fllscrnbttn.addEventListener("click", toggleFullScreen);

//side nav contols
sideNextButton = document.getElementById("leftarrow");
sidePrevButton = document.getElementById("rightarrow");

navfunction = function (option){
    currentPg = viewer.currentPage();
    lastPage = imgArr.length;
    if(option == "next" && currentPg < lastPage){
      viewer.goToPage(currentPg +1);
    }
    if(option == "prev" && currentPg >0){
        viewer.goToPage(currentPg -1);
    }
}

sideNextButton.addEventListener("click", function(){
  navfunction("next");
  console.log("fired next");
});
sidePrevButton.addEventListener("click", function(){
  navfunction("prev");
  console.log("fired prev");

});
// go to page control

jumpToPageButton = document.getElementById("jumptopagebutton");
//checks if pages exists and jumps to it if it is not already shown
goToPage = function(){
  currentPg = viewer.currentPage();
  jumptopage = document.getElementById("jumptopage").value;
  pageSum = imgArr.length;
  if(jumptopage != currentPg && jumptopage >= 0 && jumptopage < pageSum && pageSum>0){
      viewer.goToPage(parseInt(jumptopage)-1);
  }
}
jumpToPageButton.addEventListener("click", goToPage);
