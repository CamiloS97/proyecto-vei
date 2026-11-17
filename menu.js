const barraNavegacion = document.querySelector(".barra-de-navegacion");
const botonMenu = barraNavegacion.querySelector(".boton-menu");

botonMenu.addEventListener("click", () => {
    const menuAbierto = barraNavegacion.classList.toggle("menu-abierto");
    botonMenu.setAttribute("aria-expanded", String(menuAbierto));
    botonMenu.setAttribute("aria-label", menuAbierto ? "Cerrar menú" : "Abrir menú");
});
