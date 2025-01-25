export function inicioSesionModals() {
    const cerrar = document.getElementById('btn-cerrar');
    const iniciar = document.getElementById('btn-iniciar');
    const btns_Reservar = document.getElementsByClassName('btn-reservar');
    const modal = document.getElementById('modal_inicioSesion');
    const contenedor = document.getElementById('contenedor_modal');
    const all = document.getElementById('body');
    const formu = document.getElementById('formulario');
    const contenedor2 = document.getElementById("contenedor_modal2")
    const formu2 = document.getElementById("formulario2")
    const modal2 = document.getElementById("modal_Registrate")
    const btn_registro = document.getElementById('registro') 
    const btn_iniciar = document.getElementById("iniciar")


    function mostrarInterface() {
        const usuario = sessionStorage.getItem('usuario_activo');
        if (usuario) {
            cerrar.classList.remove('hidden');
            iniciar.classList.add('hidden');
            cerrar.addEventListener("click", () => {

                cerrar.textContent = "cerrando sesion..."
            
                setTimeout(() => {
                    // Acción de cerrar sesión
                    sessionStorage.clear();
                    cerrar.classList.add("hidden");
                    iniciar.classList.remove("hidden");
                    location.reload()

            
                }, 3000)

            });
        }
    }


    function mostrarInicio() {
        const usuario1 = sessionStorage.getItem('usuario_activo'); // Verificar si hay una sesión activa
        if (usuario1) {
            console.log("hola");
        } else {
            for (const btn of btns_Reservar) {
                btn.addEventListener("click", () => {

                    botonReservado()
                    
                });
            }

        }

        iniciar.addEventListener("click", () => {
            botonReservado(); // Abrir modal si el usuario presiona "iniciar sesión"
        });
    }

    function mostrarRegistro(){
        btn_registro.addEventListener("click", () =>{
            modal2.classList.remove('hidden');
            contenedor2.classList.remove('hidden');
            all.classList.add('overflow-y-hidden');
            contenedor2.addEventListener('click', (event) => {
                if (!modal2.contains(event.target)) {
                    cerrarModal();
                }
            });
        })
    }

    function sign() {
        btn_iniciar.addEventListener("click", () => {
            cerrarModal(); // Cerrar cualquier modal abierto
            botonReservado(); // Abrir el modal de inicio de sesión
        });
    }

    function botonReservado() {
        modal.classList.remove('hidden');
        contenedor.classList.remove('hidden');
        all.classList.add('overflow-y-hidden');
        contenedor.addEventListener('click', (event) => {
            if (!modal.contains(event.target)) {
                cerrarModal();
            }
        });
        mostrarInterface();
    }

    function cerrarModal() {
        modal.classList.add('hidden');
        contenedor.classList.add('hidden');
        all.classList.remove('overflow-y-hidden');
        modal2.classList.add('hidden');
        contenedor2.classList.add('hidden');
        all.classList.remove('overflow-y-hidden');
    }

    async function iniciarSesion() {
        formu.addEventListener("submit", async (event) => {
            event.preventDefault();
    
            // Obtener los datos ingresados por el usuario
            const correo = document.getElementById("email").value.trim();
            const password = document.getElementById("contrasena").value;
    
            try {
                // Cargar los datos del JSON (puedes usar una ruta relativa o API)
                const response = await fetch("http://localhost:3000/users"); // Cambia por la URL de tu archivo JSON
                const usuarios = await response.json();
    
                // Buscar si el usuario y la contraseña coinciden
                const usuarioValido = usuarios.find(user => user.email === correo && user.password === password);
                const id = usuarios.find(user => user.id)
    
                if (usuarioValido) {
                    // Si el usuario es válido, iniciar sesión
                    sessionStorage.setItem('usuario_activo', correo);
                    sessionStorage.setItem('contraseña', password);
                    sessionStorage.setItem('id', id.id)
    
                    alert("Inicio de sesión exitoso.");
                    mostrarInterface(); // Actualizar la interfaz del usuario
                    cerrarModal();  // Cerrar el modal de inicio de sesión
                    location.reload()
                } else {
                    // Si no coinciden, mostrar un mensaje de error
                    alert("Correo o contraseña incorrectos. Inténtalo de nuevo.");
                }
            } catch (error) {
                // Manejo de errores al cargar o procesar el JSON
                console.error("Error al validar los datos del JSON:", error);
                alert("Hubo un error al intentar iniciar sesión. Por favor, intenta más tarde.");
            }
        });
    }

    async function post (datos) {
        const respuesta = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(datos),
        });
        return respuesta.json();
    }

    function enviarDatos (){
        formu2.addEventListener("submit", (event) => {
            event.preventDefault();
            const nameSignUp = document.getElementById('name').value
            const emailSignUp = document.getElementById('email_registro').value
            const passwordSignUp = document.getElementById('contrasena_registro').value


            let data = {
                "name": nameSignUp,
                "email": emailSignUp,
                "password": passwordSignUp
            }

            post(data)
            location.reload()
        })

    }


    mostrarInterface();
    mostrarInicio();
    mostrarRegistro();
    sign();
    enviarDatos();
    iniciarSesion();
}