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


//classes
class Presupuesto {
    constructor(Presupuesto){
        this.presupuesto = Number(Presupuesto);
        this.restante = Number(this.restante);
        this.gastos = []
    }
}

class UI{

}

//functiones
function preguntarPresupuesto(){
    dialog.showModal()

    closeButton.disabled = true

    input.addEventListener('click', () => {
        const inputValue = Number(input.value.trim())
        closeButton.disabled = inputValue <= 0 || isNaN(inputValue);  
    })
}