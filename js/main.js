var jq = jQuery.noConflict();
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
      zoomInButton:     "zoominbttn",
      zoomOutButton:    "zoomoutbttn",
      homeButton:       "homebttn",
      minZoomImageRatio:  1,
      maxZoomPixelRatio:  1,
      nextButton:         "nextbttn",
      previousButton:     "previousbttn",
      tileSources:        imgArr,
      sequenceMode:       true,
  });
  viewer.canvas.style.backgroundColor = "#2D2D2D";
  //for thumbbar.js
var thumbViewer = new OpenSeadragon.Thumbbar({id: "thumbbar",
    mainviewer : viewer,
    position : "bottom",
    direction : "RTL",
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
      thumbViewer.scrollToThumb(currentPg +1);
    }
    if(option == "prev" && currentPg >0){
        viewer.goToPage(currentPg -1);
        thumbViewer.scrollToThumb(currentPg -1);
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

jumpToPageForm = document.getElementById("jumptopageForm");
//checks if pages exists and jumps to it if it is not already shown
goToPage = function(e){
  if (e.preventDefault) {
       e.preventDefault();
    }
    e.returnValue = false; // for IE
  currentPg = viewer.currentPage();
  jumptopage = (document.getElementById("jumptopage").value -1);
  console.log(jumptopage);
  pageSum = imgArr.length;
  if(jumptopage != currentPg && jumptopage >= 0 && jumptopage < pageSum && pageSum>0){
      viewer.goToPage(jumptopage);
      thumbViewer.scrollToThumb(jumptopage);
  }
  if(jq(document).width() <= "550"){
      jq("#menuUl").slideToggle("slow");
  }
}
jumpToPageForm.addEventListener('submit', goToPage, false);

// menu control for handhelds screen width max 500px
menuToggle = document.getElementById("menuToggle");

jq("document").ready(function(){
  var windowWidth;
  function toggleMenuClick(){
     windowWidth = jq(window).width();
    if(windowWidth <= "680"){
      jq("#menuUl").slideToggle("slow");
    }
  }
  windowWidth = jq(window).width();
  if(windowWidth <= "680"){
    jq("#menuUl").hide();
    jq("#menuToggle ,#fullscrnbttn, #homeli").on('click',toggleMenuClick);

  }
  else{
      jq("#menuUl").show();
      jq("#menuToggle, #fullscrnbttn, #homeli").off('click',toggleMenuClick);
  }

    console.log(jq(document).width());
});
