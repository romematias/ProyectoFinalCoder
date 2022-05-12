const DateTime = luxon.DateTime;


// DOM
const botonAgregarLista = document.getElementById("btnAgregarLista");
const inputLista = document.getElementById("inputLista");
const notepad = document.getElementById("notepad");
const botonGuardarNotepad = document.getElementById("btnGuardarNotepad");
const inputContador = document.getElementById("inputContador");
const tiempoContador = document.getElementById("tiempoContador");
const botonBorrarLista = document.getElementById("btnBorrarLista");
const containerHora = document.getElementById("hora");
const containerClima = document.getElementById("clima");
const botonSeleccionarTodo = document.getElementById("btnSeleccionarTodoLista");
const botonBorrar = document.getElementById("btnBorrarLista");
const botonFinalizar = document.getElementById("btnFinalizarLista");
const checkboxNota = document.getElementById("checkNota");
const botonBorrarGuardado = document.getElementById("btnBorrarGuardado");

// Clima con Openweathermap API
window.addEventListener('load', () => {
  let lon;
  let lat;
  // Consigo latitud y longitud
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(posicion => {
      lat = posicion.coords.latitude;
      lon = posicion.coords.longitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=49453fc99042e1614be6aaad79f1e64d&units=metric`;

      fetch(url)
        .then(response => { return response.json() })
        .then(data => {
          let temperatura = Math.round(data.main.temp);
          containerClima.textContent = `${temperatura}°C`;
          temperatura > 15 ? (containerClima.innerHTML += " ☀") : (containerClima.innerHTML += " ❄");
        })
        .catch(error => {
          console.log(error)
        })
    })
  }

})

// Dia y hora actual con Luxon
let setHora = () => {
  const horaActual = DateTime.now();
  containerHora.innerHTML = horaActual.toFormat("LLL, dd HH:mm");
}

// Intervalo para actualizar el día y la hora
setInterval(function () {
  setHora();
}, 1000);

class Nota {

  constructor(texto, resaltar) {
    this.texto = texto;
    this.resaltar = resaltar;
  }

}

let notasGuardadas = [];

// Eventos
botonAgregarLista.onclick = () => {
  let ingresarTarea = inputLista.value;
  const tareaDOMLabel = document.createElement("label");
  tareaDOMLabel.className = "list-group-item";
  const tareaDOMInput = document.createElement("input");
  tareaDOMInput.className = "form-check-input me-1";
  tareaDOMInput.setAttribute("type", "checkbox");
  tareaDOMLabel.append(tareaDOMInput);
  tareaDOMLabel.innerHTML += " " + ingresarTarea;
  document.getElementById("listaTareas").appendChild(tareaDOMLabel);
};

// Borrar tareas
botonBorrarLista.onclick = () => {
  let checkedItems = [];
  let inputElements = document.getElementsByClassName("form-check-input");
  for (var i = 0; inputElements[i]; ++i) {
    if (inputElements[i].checked) {
      checkedItems.push(inputElements[i]);
    }
  }
  for (var i = 0; checkedItems[i]; ++i) {
    checkedItems[i].parentNode.remove();
  }
};

// Seleccionar todas las tareas
botonSeleccionarTodo.onclick = () => {
  let inputElements = document.getElementsByClassName("form-check-input me-1");
  for (var i = 0; inputElements[i]; ++i) {
    inputElements[i].checked = true;
  }
}

// Finalizar tarea
botonFinalizar.onclick = () => {
  let inputElements = document.getElementsByClassName("form-check-input me-1");
  for (var i = 0; inputElements[i]; ++i) {
    if (inputElements[i].checked = true) {
      inputElements[i].setAttribute('disabled', '');
    }
  }
}



let notasPrevias = [];

const guardar = (clave, valor) => { localStorage.setItem(clave, valor) };

// Guardar texto del Notepad
botonGuardarNotepad.onclick = () => {
    let texto = new Nota(notepad.value, checkboxNota.checked);
    localStorage.setItem((1 + localStorage.length), JSON.stringify(texto));
  };


for (var i = 1; i <= localStorage.length; i++) {
  let notaLocal = localStorage.getItem(i);
  let notaFinal = JSON.parse(notaLocal);
  notasGuardadas.push(notaFinal);
}

const muestraNotas = document.getElementById("muestraNotas");

for (const nota of notasGuardadas) {
  const cajaNota = document.createElement("div");
  if (nota.resaltar) {
    cajaNota.className = "col-2 border border-5 border-danger rounded p-3 m-2"
  } else {
    cajaNota.className = "col-2 border border-dark rounded p-3 m-2"
  }
  muestraNotas.append(cajaNota);
  cajaNota.innerHTML += nota.texto;
}


botonBorrarGuardado.onclick = () => {
  localStorage.clear();
  muestraNotas.innerHTML = "";
}