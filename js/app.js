//variable y selectores
const formulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");
const dialog = document.getElementById("myDialog");
const closeButton = dialog.querySelector("button");
const input = dialog.querySelector("input");
//eventos
eventListener();
function eventListener() {
  document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
  formulario.addEventListener("submit", guardarDatos);
}

dialog.style.position = "fixed";
dialog.style.zIndex = "9999";

//classes
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }
  nuevoGasto(gasto) {
   this.gastos = [...this.gastos, gasto]
   console.log(this.gastos)
  }
}

class UI {
  insertarPresupuesto(cantidad) {
    const { presupuesto, restante } = cantidad;
    document.querySelector("#total").textContent = presupuesto;
    document.querySelector("#restante").textContent = restante;
  }
  imprimitAlerta(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert");
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }
    divMensaje.textContent = mensaje;
    document.querySelector(".primario").insertBefore(divMensaje, formulario);
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
  agregarGastoListado(gastos) {
    while(gastoListado.firstChild){
      gastoListado.removeChild(gastoListado.firstChild)
    }
    gastos.forEach(element => {
      const { cantidad, nombre, id } = element;
      const nuevoGasto = document.createElement("li");
      nuevoGasto.className =
        "list-group-item d-flex justify-content-between align-items-center";
      nuevoGasto.dataset.id = id;

      const nombreTexto = document.createTextNode(nombre);
      //crea el span para el badge
      const span = document.createElement("span");
      span.classList = "badge badge-primary badge-pill";
      span.textContent = `$${cantidad}`;
      nuevoGasto.appendChild(nombreTexto);
      nuevoGasto.appendChild(span);
      //btn para borrar
      const btnBorrar = document.createElement("button");
      btnBorrar.textContent = "x"
      btnBorrar.classList.add("btn", "btn-danger", "borrar-gasto");
      nuevoGasto.appendChild(btnBorrar);

      gastoListado.appendChild(nuevoGasto);
    });
  }
}

const ui = new UI();
let presupuesto;

//functiones
function preguntarPresupuesto() {
  dialog.showModal();
  dialog.addEventListener("cancel", (e) => e.preventDefault());

  closeButton.disabled = true;

  input.addEventListener("input", () => {
    const inputValue = Number(input.value);
    closeButton.disabled = inputValue <= 0 || isNaN(inputValue);
  });

  closeButton.addEventListener("click", () => {
    dialog.close();
    dialog.style.display = "none";
    presupuesto = new Presupuesto(Number(input.value));
    ui.insertarPresupuesto(presupuesto);
  });
}

function guardarDatos(e) {
  e.preventDefault();
  const nombre = document.querySelector("#gasto").value;
  const cantidad = document.querySelector("#cantidad").value;

  if (nombre === "" || cantidad === "") {
    ui.imprimitAlerta("ambos campos son obligatorios", "error");
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.imprimitAlerta("cantidad valida", "error");
    return;
  }

  const gasto = { nombre, cantidad, id: Date.now() };
  presupuesto.nuevoGasto(gasto);
  ui.imprimitAlerta("Gasto agregado con exito");
  ui.agregarGastoListado(presupuesto.gastos); // ← esto sí le pasa el array completo
  formulario.reset();
}
