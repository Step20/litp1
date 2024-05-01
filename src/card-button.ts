import { LitElement, css, html } from 'lit'
import { customElement, property, state, queryAssignedElements} from 'lit/decorators.js'
import {map} from 'lit/directives/map.js';
import './card-box.js';

@customElement('card-button')
export class CardButton extends LitElement {
    @property({ type: Array })
    cardList = [];

    render() {
        return html`
            <button @click=${this.addCard}>
                Add card 
            </button>
        `
    }

    static styles = css`
    :host {
        

      }
      button{
        background: #1a1a1a;
        border: 1px solid grey;
        padding: 1vw 2vw;
        border-radius: 1vw;
      }
      button:hover {
        cursor: pointer;
      }
    `

    addCard() {
        this.dispatchEvent(new CustomEvent('add-card'));
    }
}

declare global {
    interface HTMLElementTagNameMap {
      "card-button": CardButton;
    }
  }