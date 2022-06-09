/** Variables */
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

/** Variables para campos  */
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
    /** Cuando la APP arranca */
    document.addEventListener('DOMContentLoaded', iniciarApp);

    /** Campos del formulario */
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    /** Reinicia el formulario */
    btnReset.addEventListener('click', resetearFormulario);

    /** Enviar email */
    formulario.addEventListener('submit', enviarEmail);

}


/** Funciones */
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Valida el formulario
function validarFormulario(e) {

    
    
    if(e.target.value.length > 0) {

        // Elimina mensaje de error, cuando el campo esta lleno
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }
        

        e.target.classList.remove('border', 'border-red-500'); // cambio de colores
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500'); // cambio de colores
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') { // Validacion del @ en el email
        if( er.test( e.target.value ) ) {
            // Elimina mensaje de error, cuando el campo esta lleno
            const error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }
           
            e.target.classList.remove('border', 'border-red-500'); // cambio de colores - e.target hace referencia al campo actual
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500'); // cambio de colores
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
        }
    }


    if( er.test( email.value ) && asunto.value !== '' && mensaje.value !== '') { // valida el correo, se cambia a email.value
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError( mensaje ) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error'); // Muestra solo un mensaje de error
    if( errores.length === 0) {
        formulario.appendChild(mensajeError);
    }

    
}


/** Enviar el email */
function enviarEmail(e) {
    e.preventDefault();

    /** Mostrar el spinner */
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';


/** Despues de 3 segundos ocultar el spinner y mostrar el mensaje */
setTimeout( () => {
    spinner.style.display = 'none';

    /** Mensaje que dice que se envío correctamente */
    const parrafo = document.createElement('p');
    parrafo.textContent = 'El mensaje se envio correctamente...';
    parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'fond-bold', 'uppercase');

    /** Inserta el parrafo antes del spinner */
    formulario.insertBefore(parrafo, spinner);

    setTimeout( () => {
        parrafo.remove(); // Elimina el mensaje de exito

        resetearFormulario();
        }, 5000);
    }, 3000);
}

/** Funcion que resetea el formulario */
function resetearFormulario() {
    formulario.reset();

    iniciarApp(); // se desabilita el boton enviar
}

