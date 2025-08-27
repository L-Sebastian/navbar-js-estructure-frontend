document.addEventListener("DOMContentLoaded", function(){
    const navbarElement = document.querySelector(".navbar-container");

    if(navbarElement){
        fetch("/frontend/public/views/components/navbar.html")
        .then(response => response.text())
        .then(data => {
            navbarElement.innerHTML = data;
            
            //===Logica para resaltar el enlace activo en el navbar

            //Obtener la ruta actual
            //Si no hay un archivo especifico se asume que es el index
            const currentPage = window.location.pathname.split("/").pop() || "index.html";

            //Selecciona todos los enlaces del navbar que usaran la clase personalizada
            const navLinks = navbarElement.querySelectorAll(".navbar__link"); 
            
            //Recorre cada enlace del navbar
            navLinks.forEach(link => {

                //Verifica si el href del enlace incluye el nombre de la pagina actual
                if(link.getAttribute("href").includes(currentPage)){
                    //Si es la pagina actual se le asigna la clase 'active' para destacarla visualmente
                    link.classList.add ("active");
                }
            });
    })
    .catch(error => console.error("Error cargando el navbar", error));

    }
}); 