document.addEventListener("DOMContentLoaded",function(){
    const navbarElement = document.querySelector(".navbar-container")

    if(navbarElement){
        fetch("/frontend/public/views/components/navbar.html")
        .then(Response => Response.text())
        .then(data => {navbarElement.innerHTML = data;
        })
        .catch(error => console.error("Error cargando el navbar",error))

    } 
});