import * as components from './components/indexPadre' 
import Card, {Attribute} from './components/characterCard/characterCard';
import { getData } from './services/fetchApi';

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.getEvents();
    }

    getEvents() {
        const button = this.shadowRoot?.querySelector("button");
        const input = this.shadowRoot?.querySelector("input");

        button?.addEventListener("click", async () => {//añade un evento al boton
            // console.log('clik');
            
            const count = parseInt(input?.value || '0'); // Obtiene el valor del input verificando que no sea 0 - parseInt ---> Convierte un el string del input a un numero
            // console.log('Valor del input:', count);

            const characters = await this.getCharacters(count); // Llama a la función para obtener los personajes esperando a obtener el valor del input  
            console.log('Personajes obtenidos:', characters);

            this.renderCharacters(characters);
        });
    }

    async getCharacters(count: number) { //Llama a getData para obtener los datos de la API
        const data = await getData(); // Llama a la función getData para obtener los datos
        return data.results.slice(0, count); // slice ---> Devuelve la cantidad de personajes solicitada en un array sin modificar el original
    }

    renderCharacters(characters: any[]) { 
        const container = this.shadowRoot?.querySelector(".characters-container"); //recibe el array de personajes y busca el contenedor donde se mostrarán en el DOM
        if (container) {
            container.innerHTML = ''; // Limpia el contenedor
            characters.forEach(character => {
        
                const card = document.createElement('character-card') as Card;

                
                card.setAttribute(Attribute.image, character.image || '');
                card.setAttribute(Attribute.name, character.name || 'Desconocido');
                card.setAttribute(Attribute.status, character.status || 'Desconocido');
                card.setAttribute(Attribute.species, character.species || 'Desconocido');
                card.setAttribute(Attribute.type, character.type || 'Desconocido');
                card.setAttribute(Attribute.origin, character.origin?.name || 'Desconocido'); 
                card.setAttribute(Attribute.firstepisode, character.episode[0] || 'Desconocido'); // Solo toma el primer episodio

                container.appendChild(card); // Agrega la tarjeta al contenedor
            });
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="style.css">
            <section class="container-opacity"></section>
            <section class="conatiner-input">
                <h1>Render Characters</h1>
                <div class="buttoninput-container">
                    <input class="input" type="text" placeholder="Enter a number of characters">
                    <button>Click</button>  
                </div>
                <div class="characters-container"></div>
            </section>
            `;
        }
    }
}

customElements.define('app-container', AppContainer);
