//variable y selectores
const formulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");
const dialog = document.getElementById("myDialog");
const closeButton = dialog.querySelector("button");
const input = dialog.querySelector("input")
//eventos
eventListener();
function eventListener(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', guardarDatos);
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
    imprimitAlerta(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === "error"){
            divMensaje.classList.add('alert-danger')
        }else{
            divMensaje.classList.add('alert-success')
        }
        divMensaje.textContent = mensaje;
        document.querySelector('.primario').insertBefore(divMensaje, formulario)
        setTimeout(() => {
            divMensaje.remove()
        }, 3000);
    }
}

const ui = new UI();
let presupuesto;

//functiones
function preguntarPresupuesto(){
    dialog.showModal()

    closeButton.disabled = true

    input.addEventListener('input', () => {
        const inputValue = Number(input.value)
        closeButton.disabled = inputValue <= 0 || isNaN(inputValue);
    })

    closeButton.addEventListener("click", ()=> {
        dialog.close();
        dialog.style.display ="none";
        presupuesto = new Presupuesto(Number(input.value))
        ui.insertarPresupuesto(presupuesto)
    })
}

function guardarDatos(e){
    e.preventDefault();
    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

    if(nombre === "" || cantidad === ""){
        ui.imprimitAlerta("ambos campos son obligatorios", "error")
        return
    }else if(cantidad <= 0 || isNaN(cantidad)){
        ui.imprimitAlerta("cantidad valida", "error");
        return
    }
}