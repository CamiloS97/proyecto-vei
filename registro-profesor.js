const passwordInput = document.querySelector("#password");
const togglePassword = document.querySelector("#togglePassword");
const teacherForm = document.querySelector("#teacherForm");
const formFeedback = document.querySelector("#formFeedback");

// Mostrar u ocultar la contraseña.
togglePassword.addEventListener("click", () => {
  const showing = passwordInput.type === "text";

  passwordInput.type = showing ? "password" : "text";

  togglePassword.setAttribute("aria-pressed", String(!showing));
  togglePassword.setAttribute(
    "aria-label",
    showing ? "Mostrar contraseña" : "Ocultar contraseña"
  );
});

// Validación del formulario.
teacherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!teacherForm.checkValidity()) {
    teacherForm.reportValidity();
    return;
  }

  formFeedback.style.color = "#168b36";

  formFeedback.textContent =
    "¡Formulario validado! Falta conectar el registro con el sistema.";
});