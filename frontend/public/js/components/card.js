//Exportamos una función llamada loadCards que acepta:
//-containerSelector: un selector CSS para el contenedor donde van las card
//-CardIds: un array opcional con los IDS de las card que se quieren mostrar.

export async function loadCards(containerSelector, cardIds = []) {
    //Aqui obtenemos el contenedor del DOOM
    const container = document.querySelector(containerSelector);
    //Si el contenedor es diferente, se rompe 
    if (!container) return;//Si no existe, simplemente nos salimos

    try {

        const [templateRes, dataRes] = await Promise.all([
            //Hacer dos Featch al mismo tiempo
            //1- Es para la plantilla
            //2- Es para los datos
            fetch("/frontend/public/views/components/card.html"),
            fetch("/frontend/public/data/cards.json"),
        ]);

        //Convertir las respuestas de las promesas a texto y a json
        const template = await templateRes.text();
        const card = await dataRes.json();

        //Filtramos las Cards si se propornionan los IDS especificos
        const filteredCards = cardIds.length
            //terminador
            ? card.filter(card => cardIds.includes(card.id))//Solo las que están en el arreglo
            //Si no esta el id, las quita
            : card;//Si no hay filtro, uselas todas

        filteredCards.forEach(card => {
            //Reemplazamos los paceholder{{...}} del template con los datos reales
            let html = template
                .replace("{{title}}", card.title)
                .replace("{{icon1}}", card.icon1)
                .replace("{{icon2}}", card.icon2)
                .replace("{{description}}", card.description)

            //container.innerHTML += html;
            container.insertAjacentHTML("beforeend", html);

        });
    } catch (error) {
        console.error("Error cargando las cards", error);
    }



}