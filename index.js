/*
 ************ ModelViewer *********************************************************
 */
 let isFullscreen = false;


 function toggleFullscreen(modelViewerId) {
     var modelViewerIdGet = modelViewerId.closest("model-viewer");
     console.log(modelViewerIdGet);
 
     if (!isFullscreen) {
         enterFullscreen(modelViewerIdGet);
     } else {
         exitFullscreen();
     }
 }
 
 function enterFullscreen(modelViewer) {
     if (modelViewer.requestFullscreen) {
         modelViewer.requestFullscreen();
     } else if (modelViewer.webkitRequestFullscreen) {
         /* Safari */
         modelViewer.webkitRequestFullscreen();
     } else if (modelViewer.msRequestFullscreen) {
         /* IE11 */
         modelViewer.msRequestFullscreen();
     }
 
     updateButtonLabel(true);
 }
 
 function exitFullscreen() {
     if (document.exitFullscreen) {
         document.exitFullscreen();
     } else if (document.webkitExitFullscreen) {
         /* Safari */
         document.webkitExitFullscreen();
     } else if (document.msExitFullscreen) {
         /* IE11 */
         document.msExitFullscreen();
     }
 
     updateButtonLabel(false);
 }
 
 function updateButtonLabel(isEnteringFullscreen) {
     const buttons = document.getElementsByClassName('fullscreen-button');
     isFullscreen = isEnteringFullscreen;
     for (const button of buttons) {
         button.innerHTML = isEnteringFullscreen ?
             '<p id="close"><i class="far fa-times-circle"></i>Exit</p>' :
             '<i class="fas fa-expand-arrows-alt" id="big"></i>';
     }
 }
 
 
 document.addEventListener('fullscreenchange', () => {
     const isFullscreenNow = document.fullscreenElement || document.webkitFullscreenElement ||
         document.msFullscreenElement;
     updateButtonLabel(isFullscreenNow);
 });
 
 document.addEventListener('webkitfullscreenchange', () => {
     const isFullscreenNow = document.fullscreenElement || document.webkitFullscreenElement ||
         document.msFullscreenElement;
     updateButtonLabel(isFullscreenNow);
 });
 
 document.addEventListener('MSFullscreenChange', () => {
     const isFullscreenNow = document.fullscreenElement || document.webkitFullscreenElement ||
         document.msFullscreenElement;
     updateButtonLabel(isFullscreenNow);
 });
 
 /*
  ************ ModelPartsSelect *********************************************************
  */
 function selectChange(modelParts) {
     const productName = modelParts.name;
     const productId = document.getElementById(productName);
 
     const value = modelParts.value;
     const pare = modelParts.parentElement;
     const next = pare.nextElementSibling;
     const all = productId.getElementsByClassName(value);
     next.innerHTML = '';
 
     for (let i = 0; i < all.length; i++) {
         next.innerHTML = all[i].innerHTML;
     }
 
 }
 /*
  ************ Filter *********************************************************
  */
  function clickFilter(btnName) {
     var value = btnName.getAttribute("value");
     var BlockName = "filter_" + value;
     var TrName = document.getElementsByClassName(BlockName);
     var Example = document.getElementsByClassName("tr_data filter_all");
 
     // すべての行を非表示にする
     for (let e = 0; e < Example.length; e++) {
         Example[e].style.display = "none";
     }
 
     // フィルターに一致する行のみを表示する
     for (let i = 0; i < TrName.length; i++) {
         TrName[i].style.display = "table-row";
     }
 
     // テーブルヘッダの変更
     var tableHead = document.getElementById("tableHead");
     if (value === "FreezeBox") {
         tableHead.innerHTML = `
             <tr>
                 <th>Product Name</th>
                 <th colspan="2">Photo</th>
                 <th colspan="2">Parts</th>
                 <th class="spetification"><p>Specification</p></th>
             </tr>
         `;
     } else {
         // デフォルトのヘッダに戻す
         tableHead.innerHTML = `
             <tr>
                 <th>Product Name</th>
                 <th>Photo</th>
                 <th>Capacity</th>
                 <th>Parts</th>
                 <th>3D</th>
                 <th class="spetification"><p>Specification</p></th>
             </tr>
         `;
     }
 }
