	
const navSlide =()=>{
  const bars = document.querySelector('.bars');
  const nav= document.querySelector('.nav-links');
  const navLinks= document.querySelectorAll('.nav-links li');
  
  
  bars.addEventListener('click', ()=>{
      
      nav.classList.toggle('nav-active');
      
      
      navLinks.forEach((link, index) => {
              if(link.style.animation){
                  link.style.animation="";
              } 
              else{
                  link.style.animation = `navLinkFade 0.5s ease forwards ${index/ 7 + 0.3}s`
              }
          }
      );

      
      bars.classList.toggle('toggle');
  
  });
  
}

navSlide();

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



let userUpdate=document.querySelector('.update-message');
let rejectsession= document.querySelectorAll('.update-info')
rejectsession.forEach((btn)=>
{
 
   btn.addEventListener('click',()=>
   {
    userUpdate.style.display='block'
    setTimeout(()=>{userUpdate.style.display='none'},1000)
    

   })
})












