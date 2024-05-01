import { LitElement, css, html } from 'lit'
import { customElement, property, state, queryAssignedElements} from 'lit/decorators.js'
import {map} from 'lit/directives/map.js';
import './card-box.js';

@customElement('delete-button')
export class DeleteButton extends LitElement {
    @property({ type: Number })
    index: number = 0;

    render() {
        return html`
            <p @click=${this.deleteCard}>
                &#128465;
            </p>
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

    deleteCard() {
        this.dispatchEvent(new CustomEvent('delete-card', { 
            detail: { index: this.index }, 
            bubbles: true, 
            composed: true 
        }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
      "delete-button": DeleteButton;
    }
  }