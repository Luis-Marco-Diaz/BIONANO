//E-BookVol-3
function Ebook3() {

    let modal = document.getElementById("Eb3");
    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[3];
  
    modal.style.display = "inline-block";
  
    // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
       }
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
     }
  
  }