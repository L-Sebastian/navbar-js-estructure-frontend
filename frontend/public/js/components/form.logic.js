//logica del formulario de contacto de proyecto freelancer
//el objetivo es poder manipular los datos que se registren en el formulario
//const formdata = new FormData(form); 
//const  { formdata } = require("undici-types");
//que siginifica new? en js la palabra reservada new sirve para crear una nueva instancia de un objeto apartir de una funcion constructora o una clase

// Formdata(form) = [
//     ["Nombre", "Edwar Velásquez"]
//     ["Teléfono", "31648578"]
//     ["Correo", "ricoprogramar@gmail.com"]
//     ["Mensaje", "Requiero informacion"]

// ]
// Ahora transformo esos datos en un objeto js, con esta linea de codigo
//const data = Object.fromEntries(formdata);

// data = {
//     Nombre: "Edwar Velásquez",
//     Teléfono: "31648578",
//     Correo: "ricoprogramar@gmail.com",
//     Mensaje: "Requiero informacion"
// }

//por ultimo convierto ese objeto js en un json

const  { Formdata } = require("undici-types");

//Espera que el dom este completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () =>{
    // selecciona el formulario con la clase contact-form__form
    const form = document.querySelector(".contact-form__form")

    //verifica que el formulario exista en el DOM
    if (form){
        //escucha el evento submit del formulario
        form.addEventListener("submit", async (e) => {
            //prevenir el comportamiento por defecto del navegdor de recarga de la pagina
            e.preventDefault();

            const formdata = new FormData(form);
            const data = Object.fromEntries(formdata);

            try{

                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: {"Content-Type": "aplication/json"},
                    //convierte el objeto de datos del formulario a formato JSON
                    body: JSON.stringify(data),
                });

                //verifica si la respuesta es exitosa (codigo 200-299)
                if (response.ok) {
                    alert("Mensaje enviado con éxito");
                    form.reset();
                } else {
                    alert("Hubo un problama al enviar el mensajes")//notifica de un error en el servidor
                }
            } catch (error){
                console.error(error)
                alert("Error de conexión")
            }
        });
    };
});    