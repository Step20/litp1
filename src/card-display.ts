import { LitElement, css, html } from 'lit'
import { customElement, property, state, queryAssignedElements} from 'lit/decorators.js'
import {map} from 'lit/directives/map.js';
import './card-box.js';
import './card-button.js';

@customElement('card-display')
export class CardDisplay extends LitElement {
    @queryAssignedElements()
    private readonly cardElements!: HTMLElement[];

    @state()
    cardList = [{ headerText: 'Card Title', bodyText: 'Body Text'},
    ];

    render() {
        return html`
            <card-button .cardList=${this.cardList} @add-card=${this.addCard}></card-button>
            <div>
                <!-- <slot></slot> -->
                ${map(this.cardList, (item, index) => html`
                    <card-box index=${index} headerText=${item.headerText} bodyText=${item.bodyText} opened></card-box>
                `)}
            </div> 
        `
    }

    addCard() {
        this.cardList = [...this.cardList, { headerText: '', bodyText: '' }];
    }

    deleteCard(index: number) {
        this.cardList = this.cardList.filter((_, i) => i !== index);
        console.log(index)
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('delete-card', (event: Event) => {
            const customEvent = event as CustomEvent;
            const index = customEvent.detail.index;
            this.deleteCard(index);
        });
    }

    static styles = css`
    :host {
        width: 100%;
        text-align: center;
        justify-content: center;
        
      }

      div{
        height: 50vh;
        overflow-y: scroll;
        padding: 2rem;
        text-align: center;
        justify-content: center;
        display: grid;
        grid-template-columns: auto auto auto;
      }
`
}

declare global {
    interface HTMLElementTagNameMap {
      "card-display": CardDisplay;
    }
  }