import { LitElement, css, html, svg } from 'lit'
import { customElement, property, query, queryAssignedElements} from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import './delete-button.js';

@customElement('card-box')
export class CardBox extends LitElement {
    @property({type: String})
    headerText: string = 'Card Title';

    @property({type: String})
    bodyText: string = 'Body Text';

    @property({type: Boolean})
    opened: boolean = false;

    @property({type: Number})
    index: number = 0;
   
    render() {
        return html`
        <div>
            <header>
                <input id="title" @input=${this.changeTitle} placeholder="Enter card title..." value=${this.headerText} />
                <div class="top-icons">
                    <div >
                        ${when(this.opened, 
                            () => html`                    
                                <p @click=${() => this.opened = !this.opened}>&#9660;</p>
                            `,
                            () => html`
                                <p @click=${() => this.opened = !this.opened}>&#9650;</p>
                            ` 
                        )}
                    </div>
                    <delete-button .index=${this.index} @delete-card=${this.deleteCard}></delete-button>
                </div>
            </header>
            <main ?hidden=${!this.opened}>
                <textarea wrap="hard" maxlength="50" placeholder="Enter card body...">${this.bodyText}</textarea>
            </main>
        </div>
        `
    }

    @query("#title")
    inputTitle! : HTMLInputElement;

    changeTitle() {
        this.headerText = this.inputTitle.value
    }

    deleteCard() {
        this.dispatchEvent(new CustomEvent('delete-card', { detail: { index: this.index } }));
    }
   

    static styles = css`
        :host {
            width: 20vw;
            margin: 1vw;
            
        } 
        .top-icons {
            display: flex;
        }
        .top-icons :first-child  {
            padding-right: .4vw;
            cursor: pointer;
        }
        .top-icons :last-child  {
            cursor: pointer;
        }
        input {            
            
            border: 0; 
            background: transparent;
        }
        input:hover {
            cursor: pointer;
        }
        textarea {
            border: 0; 
            background: transparent;
            max-height: 5vw;
            resize:none;
            text-align: center; 
        }
        header{
            background: #1a1a1a;
            border: 1px solid grey;
            padding: .1vw 1.5vw;
            border-top-left-radius: 2vw;
            border-top-right-radius: 2vw;    
            display: flex;
            justify-content: space-between;
        }
        main {
            height: 6vw;
            border: 1px solid grey;
            background: #1a1a1a;
            align-content: center;
            padding: 1rem;
            text-align: center;
            justify-content: center;
            border-bottom-left-radius: 2vw;
            border-bottom-right-radius: 2vw;
            
        }
    `
}



declare global {
    interface HTMLElementTagNameMap {
      "card-box": CardBox;
    }
  }