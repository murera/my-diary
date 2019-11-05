	
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
let settings_updated= document.querySelectorAll('.update-info')
settings_updated.forEach((btn)=>
{
 
   btn.addEventListener('click',()=>
   {
    userUpdate.style.display='block'
    setTimeout(()=>{userUpdate.style.display='none'},1000)
    

   })
})


var time, alarm, currentH, currentM,
				activeAlarm = false;
			
			function addMinSecVals(id) {
			  var select = id;
			  var min = 59;
			  
			  for (i = 0; i <= min; i++) {
				
				select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i < 10 ? "0" + i : i);
			  }
			}
			function addHours(id) {
			  var select = id;
			  var hour = 12;
			  
			  for (i = 0; i <= hour; i++) {
				select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
			  }
			}
			addMinSecVals(minutes);
			addMinSecVals(seconds);
			addHours(hours);










