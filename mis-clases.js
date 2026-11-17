const cambiarCalendario = document.getElementById("btn-calendario");
const cambiarClases = document.getElementById("btn-clases");
let clases=document.querySelector(".mis-clases");
let calendario=document.querySelector(".calendario");
cambiarCalendario.addEventListener("click",()=>{
    clases.style.display= "none";
    calendario.style.display= "block";
    cambiarClases.className = "sb-inactiva";
    cambiarCalendario.className = "sb-activa";
})



cambiarClases.addEventListener("click",()=>{
   clases.style.display= "block";
   calendario.style.display= "none";
   cambiarClases.className = "sb-activa";
cambiarCalendario.className = "sb-inactiva";
})