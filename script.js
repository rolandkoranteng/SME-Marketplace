//hamburger 

const hamburger= document.getElementById('hamburger');
const nav = document.getElementById('bar');

hamburger.addEventListener('click',()=>
{
 nav.classList.toggle('active');
 hamburger.classList.toggle('active');
});