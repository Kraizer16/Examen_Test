

const formulario = document.getElementById("formularioTareas");
const lista1 = document.getElementById("listaPendientes");
const lista2 = document.getElementById("listaProgreso");
const lista3 = document.getElementById("listaCompletadas");
const inputTitulo = document.getElementById("tarea");
const descripcion = document.getElementById("Descripción")
const fechaIni = document.getElementById("fechaInicio")
const fechaFin = document.getElementById("fechaFin")
var select = document.getElementById('estado');



fetch('http://localhost:3000/posts')
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        datos.forEach((tarea) => {
            agregarTareaDOM(tarea.id, tarea.texto, tarea.descripcion, tarea.fechaInicio, tarea.fechaFin);
        });
    })
    .catch((error) => console.error("Error en el consumo del JSON:", error.message))
    .finally(() => console.log("Se ha consumido todo el JSON"));


function update() {
    var option = select.options[select.selectedIndex];
    document.getElementById('value').value = option.value;
}


select.addEventListener("change", () => {
    update();
})
formulario.addEventListener("submit", (event) => {
    event.preventDefault();


    const valorEstado = select.options[select.selectedIndex].value

    const tarea = inputTitulo.value.trim();
    const descrip = descripcion.value.trim();
    const fechaOne = fechaIni.value;
    const fechaTwo = fechaFin.value;
    if (tarea === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }

    const nuevaTarea = { texto: tarea, descripcion: descrip, fechaInicio: fechaOne, fechaFin: fechaTwo,  estado: valorEstado };
    post(nuevaTarea).then((respuesta) => {
        agregarTareaDOM(respuesta.id, respuesta.texto, tarea.descripcion, tarea.fechaInicio, tarea.fechaFin);
    });

    inputTarea.value = "";
});

// Función POST
async function post(tarea) {
    const respuesta = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(tarea),
    });
    return respuesta.json();
}

// Función DELETE
function borrar(id) {
    fetch(`http://localhost:3000/posts/${id}`, { method: 'DELETE' })
        .then(() => console.log(`Tarea con ID ${id} eliminada`))
        .catch((error) => console.error("Error:", error));
}

// Función PUT
function put(id, datosActualizados) {
    fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosActualizados),
    })
        .then((respuesta) => respuesta.json())
        .then((datos) => console.log("Recurso actualizado:", datos))
        .catch((error) => console.error("Error:", error));
}

async function agregarTareaDOM(id, texto, descripcionn,  fechauno, fechados) {


    function allowDrop(ev) {
        ev.preventDefault();
      }
      
      function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
      }
      
      function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
      }

    try {
        // Cargar los datos del JSON (puedes usar una ruta relativa o API)
        const response = await fetch("http://localhost:3000/posts/"); // Cambia por la URL de tu archivo JSON
        const Tareas = await response.json();

        const valorEstado = Tareas.find(tarea => tarea.estado === "Pendientes" && tarea.id === id)
        if (valorEstado){
            const li = document.createElement("li");
            li.className = "flex flex-col justify-between items-center p-2 border-solid border-2 border-black m-1 gap-4";
            li.setAttribute("data-id", id);
            li.setAttribute("draggable", true)
        
            const span1 = document.createElement("span");
            span1.textContent = texto;
            const span2 = document.createElement("span");
            span2.textContent = descripcionn;
            const span3 = document.createElement("span");
            span3.textContent = fechauno;
            const span4 = document.createElement("span");
            span4.textContent = fechados;

        
            const botones = document.createElement("div");
            botones.className = "flex gap-2";
        
            const btnEliminar = document.createElement("button");
            btnEliminar.className = "fa-solid fa-trash px-1 py-1 bg-red-500 text-white rounded hover:bg-red-700";
        
            btnEliminar.addEventListener("click", () => {
                const id = li.getAttribute("data-id");
                borrar(id);
                li.remove();
            });
        
            botones.appendChild(btnEliminar);
        
            li.appendChild(span1);
            li.appendChild(span2);
            li.appendChild(span3);
            li.appendChild(span4);
            li.appendChild(botones);
            lista1.appendChild(li)
            lista1.addEventListener("ondrop", (ev) => {
                drop(ev)
            })
    
            lista1.addEventListener("ondragover", (ev) => {
                allowDrop(ev)
            })
            li.addEventListener("ondragstart", (ev) => {
                drag(ev)
            })

        }
        const valorEstado2 = Tareas.find(tarea => tarea.estado === "En Progreso" && tarea.id === id)
        if (valorEstado2) {
            const li = document.createElement("li");
            li.className = "flex flex-col justify-between items-center p-2 border-solid border-2 border-black m-1 gap-4";
            li.setAttribute("data-id", id);
            li.setAttribute("draggable", true)
        
            const span1 = document.createElement("span");
            span1.textContent = texto;
            const span2 = document.createElement("span");
            span2.textContent = descripcionn;
            const span3 = document.createElement("span");
            span3.textContent = fechauno;
            const span4 = document.createElement("span");
            span4.textContent = fechados;
        
            const botones = document.createElement("div");
            botones.className = "flex gap-2";
        
        
            const btnEliminar = document.createElement("button");
            btnEliminar.className = "fa-solid fa-trash px-1 py-1 bg-red-500 text-white rounded hover:bg-red-700";
        
            btnEliminar.addEventListener("click", () => {
                const id = li.getAttribute("data-id");
                borrar(id);
                li.remove();
            });
        
            botones.appendChild(btnEliminar);
        
            li.appendChild(span1);
            li.appendChild(span2);
            li.appendChild(span3);
            li.appendChild(span4);
            li.appendChild(botones);
            lista2.appendChild(li)
            lista2.addEventListener("ondragover", (ev) => {
                allowDrop(ev)
            })
            lista2.addEventListener("ondrop", (ev) => {
                drop(ev)
            })
            li.addEventListener("ondragstart", (ev) => {
                drag(ev)
            })
        }
        const valorEstado3 = Tareas.find(tarea => tarea.estado === "Completada" && tarea.id === id)
        if (valorEstado3) {
            const li = document.createElement("li");
            li.className = "flex flex-col justify-between items-center p-2 border-solid border-2 border-black m-1 gap-4";
            li.setAttribute("data-id", id);
            li.setAttribute("draggable", true)
        
            const span1 = document.createElement("span");
            span1.textContent = texto;
            const span2 = document.createElement("span");
            span2.textContent = descripcionn;
            const span3 = document.createElement("span");
            span3.textContent = fechauno;
            const span4 = document.createElement("span");
            span4.textContent = fechados;
        
            const botones = document.createElement("div");
            botones.className = "flex gap-2";
        
        
            const btnEliminar = document.createElement("button");
            btnEliminar.className = "fa-solid fa-trash px-1 py-1 bg-red-500 text-white rounded hover:bg-red-700";
        
            btnEliminar.addEventListener("click", () => {
                const id = li.getAttribute("data-id");
                borrar(id);
                li.remove();
            });
        
            botones.appendChild(btnEliminar);
        
            li.appendChild(span1);
            li.appendChild(span2);
            li.appendChild(span3);
            li.appendChild(span4);
            li.appendChild(botones);
            lista3.appendChild(li)
            lista3.addEventListener("ondrop", (ev) => {
                drop(ev)
            })
            lista3.addEventListener("ondragover", (ev) => {
                allowDrop(ev)
            })
            li.addEventListener("ondragstart", (ev) => {
                drag(ev)
            })
            
        }







    } catch (error) {
        // Manejo de errores al cargar o procesar el JSON
        console.error("Error al validar los datos del JSON:", error);
    }
}

