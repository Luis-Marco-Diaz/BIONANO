function Art2() {

    let modal = document.getElementById("Art2");
    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[13];
  
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