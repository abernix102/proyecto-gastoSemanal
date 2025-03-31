//variable y selectores
const formulario = document.querySelector("#agregar-gato");
const gastoListado = document.querySelector("#gastos ul");
const dialog = document.getElementById("myDialog");
const closeButton = dialog.querySelector("button");
const input = dialog.querySelector("input")
//eventos
eventListener();
function eventListener(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}

dialog.style.position = "fixed";
dialog.style.zIndex = "9999";

//classes
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = []
    }
}

class UI{
    insertarPresupuesto(cantidad) {
        const {presupuesto, restante} = cantidad;
        document.querySelector("#total").textContent = presupuesto;
        document.querySelector("#restante").textContent = restante;

    }
}
const ui = new UI();
let presupuesto;

//functiones
function preguntarPresupuesto(){
    dialog.showModal()

    closeButton.disabled = true

    input.addEventListener('input', () => {
        const inputValue = parseFloat(input.value)
        closeButton.disabled = inputValue <= 0 || isNaN(inputValue);
    })

    closeButton.addEventListener("click", ()=> {
        presupuesto = new Presupuesto(parseFloat(input.value))
        ui.insertarPresupuesto(presupuesto)
        dialog.close();
        dialog.style.display ="none";
    })
}