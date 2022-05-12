// DOM 

let botonComenzar5 = document.querySelector('#btnComenzarContador2');
let botonPausa5 = document.querySelector('#btnPausarContador2');
let botonReset5 = document.querySelector('#btnReiniciarContador2');

let botonComenzar10 = document.querySelector('#btnComenzarContador');
let botonPausa10 = document.querySelector('#btnPausarContador');
let botonReset10 = document.querySelector('#btnReiniciarContador');

let minutes5 = document.querySelector('#tiempoContador5');
let seconds5 = document.querySelector('#segContador5');

let minutes10 = document.querySelector('#tiempoContador10');
let seconds10 = document.querySelector('#segContador10');

const cambiarCont5 = document.getElementById("5min");
const cambiarCont10 = document.getElementById("10min");
const div10min = document.getElementById("div10min");
const div5min = document.getElementById("div5min");

// Timers
var timer = new easytimer.Timer({ countdown: true });
var timer2 = new easytimer.Timer({ countdown: true });

timer.addEventListener('secondTenthsUpdated', () => {
    const obj = timer.getTimeValues();

    minutes5.innerText = obj.minutes.toString().padStart(2, '0');
    seconds5.innerText = obj.seconds.toString().padStart(2, '0');
    
})

timer2.addEventListener('secondTenthsUpdated', () => {
  const obj = timer2.getTimeValues();

  minutes10.innerText = obj.minutes.toString().padStart(2, '0');
  seconds10.innerText = obj.seconds.toString().padStart(2, '0');
  
})

// Botones 5 minutos
botonComenzar5.addEventListener('click', () => {
    timer.start({
        precision: 'seconds', startValues: { minutes: 5 } 
    })
})

botonPausa5.addEventListener('click', () => {
    timer.pause();
})

botonReset5.addEventListener('click', () => {

    timer.stop();
    minutes5.innerHTML = "05";
   seconds5.innerHTML = "00";
})


// Botones 10 minutos
botonComenzar10.addEventListener('click', () => {
  timer2.start({
      precision: 'seconds', startValues: { minutes: 10 } 
  })
})

botonPausa10.addEventListener('click', () => {
  timer2.pause();
})

botonReset10.addEventListener('click', () => {
  timer2.stop();
  minutes10.innerHTML = "10";
  seconds10.innerHTML = "00";
})

cambiarCont10.addEventListener('click', () => {

div10min.classList.remove("invisible");
div5min.classList.add("invisible");

})

cambiarCont5.addEventListener('click', () => {

  div5min.classList.remove("invisible");
  div10min.classList.add("invisible");
  
  })

