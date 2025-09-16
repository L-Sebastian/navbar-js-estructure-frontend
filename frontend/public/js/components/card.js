//Exportamos una función llamada loadCards que acepta:
//-containerSelector: un selector CSS para el contenedor donde van las card
//-cardIds: un array que es opcional con los ids de las card que se quieren mostrar.
//función asincrona(async)
export async function loadCards(containerSelector, cardIds = []){

//Obtenemos el contenedor del DOM (Selecciona una clase)
    const container = document.querySelector(containerSelector);

    if(!container)return; //si no existe simplemente nos salimos 
//try: intentelo
    try{
        
        const[templateRest, dataRes] = await Promise.all([
            //Hacer dos fetch al mismo tiempo 
            //1- Es para la plantilla
            //2- Para los datos
            fetch("/frontend/public/views/components/card.html"),
            fetch("/frontend/public/data/cards.json"),
        ]);
        //Convertimos las respuestas a texto y a json
        const template = await templateRest.text();
        const cards = await dataRes.json();

        //Filtramos las cards si se proporcionan los ids específicos
        const filteredCards = cardIds.length
        ? cards.filter(card => cardIds.includes(card.id))//Solo las que están en el arreglo
        :cards;//Si no hay filtro, uselas todas

        filteredCards.forEach(card => {
            //Reemplazar los placeholder{{}} del template con los datos reales
            let html = template
            .replace("{{title}}",card.title)
            .replace("{{icon1}}",card.icon1)
            .replace("{{icon2}}",card.icon2)
            .replace("{{description}}",card.description);

            //Linea mas avanzada
            container.insertAdjacentHTML("beforeend", html);

            // container.innerHTML += html;
        });
    }catch(error){
        console.error("Error cargando las cards:", error);
    }

}
    
