import styles from './characterCard.css'
export enum Attribute {
    'image' = 'image',
    'name' = 'name',
    'status' = 'status',
    'species' = 'species',
    'type' = 'type',
    'origin' = 'origin',
    'firstepisode' = 'firstepisode',

}
class Card extends HTMLElement{
    name?: string;
    image?: string;
    status?: string;
    species?: string;
    type?: string;
    origin?: string
    firstepisode?: string

    static get observedAttributes(){
       return Object.values(Attribute)
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined){

        this[propName] = newValue
        this.render()
    }

    constructor(){
        super()
        this.attachShadow({mode: 'open'})
    }

    connectedCallback(){
        this.render()
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
        <section class="card">
                <img src="${this.image}" alt="">
                <div class="card-info">
                    <h2>${this.name}</h2>
                    <p><span class="label">Status:</span> ${this.status}</p>
                    <p><span class="label">Species:</span> ${this.species}</p>
                    <p><span class="label">Type:</span> ${this.type}</p>
                    <p><span class="label">Origin:</span> ${this.origin}</p>
                    <p><span class="label">First episode:</span> ${this.firstepisode}</p>
                </div>
            </section>
            `
        }
        const cssCard = this.ownerDocument.createElement('style');
            cssCard.innerHTML = styles;
            this.shadowRoot?.appendChild(cssCard);
    
        }
    }
customElements.define('character-card', Card)
export default Card