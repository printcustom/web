const boton= document.getElementById('toggle-menu');
const menu= document.getElementById('menu');

boton.addEventListener('click', ()=>menu.classList.toggle('menu-boton-show'));

// document.getElementById('video-intro').play();