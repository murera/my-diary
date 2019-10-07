	
/* program toggle button */
let navClose = document.getElementById('js-navbar-close');
let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");


navBarToggle.addEventListener("click", function() {
mainNav.classList.toggle("active");
navBarToggle.classList.toggle("hide");
navClose.classList.toggle("show");

});
navClose.addEventListener("click", function() {
mainNav.classList.toggle("active");
navBarToggle.classList.toggle("hide");
navClose.classList.toggle("show");

});

 

// Dialog Box
const dialogbox = (message) => { // Get the modal
  const modal = document.querySelector('#dialogbox');

  const divMsg = document.querySelector('.dialog-content-js');


  divMsg.textContent = message;
  // Display the modal
  modal.style.display = 'block';
};
const closeDialog = () => {
  document.querySelector('.modal').style.display = 'none';
  const modal = document.querySelector('#dialogbox');
  modal.style.display = 'none';
};

const admin = () =>{
  let show__button = document.querySelector('.nav-trigger');

  show__button.addEventListener('click',function(){
         document.querySelector('.side-nav').classList.toggle("visible");
        
      
     });
};










