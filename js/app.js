document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.getElementById("myDialog");
    const closeButton = dialog.querySelector("button");
    const input = document.createElement("input");

    input.type = "number";
    input.placeholder = "Ingrese su presupuesto";
    input.classList.add("form-control");

    dialog.insertBefore(input, dialog.querySelector("p").nextSibling);

    // Forzar que siempre esté visible y sobre todo
    dialog.style.position = "fixed";
    dialog.style.zIndex = "9999";
    dialog.style.top = "50%";
    dialog.style.left = "50%";
    dialog.style.transform = "translate(-50%, -50%)";

    // Mostrar el modal automáticamente
    dialog.showModal();

    // Deshabilitar el botón de cerrar al inicio
    closeButton.disabled = true;

    // Habilitar el botón solo si el input tiene un valor válido
    input.addEventListener("input", () => {
        const valor = Number(input.value.trim()); //convierto en numero
        closeButton.disabled = valor <= 0 || isNaN(valor); // desabilito si es 0, negativo o NaN
        //disable espera un valor booleano true
    });

    // Evitar que se cierre con "Esc" o clic fuera del modal
    dialog.addEventListener("cancel", (event) => {
        event.preventDefault();
    });

    // Asegurar que el modal desaparezca completamente cuando se cierre
    closeButton.addEventListener("click", () => {
        dialog.close();
        dialog.style.display = "none"; // Ocultar completamente
    });
});
