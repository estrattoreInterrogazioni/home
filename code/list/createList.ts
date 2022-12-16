import { list } from "./list";

export function createList(this: list){
    
    this.el.innerHTML = /*html*/ `
    <div class="v el">

    </div>
    <div class="v base">
        <div class="base">
            <button>+</button>
        </div>
        <div class="base">
            <button>-</button>
        </div>
    </div>
    <button>aggiorna</button>`;

    this.listContainer = this.el.getElementsByTagName("div")[0];

    var buttons = this.el.getElementsByTagName("button");
    buttons[0].addEventListener("click", (e : MouseEvent) => {
        var div = document.createElement("div");
        div.innerHTML = /*html*/ `
            <div class="el" contenteditable></div>
        `;
        this.listContainer.appendChild(div);
    });

    buttons[1].addEventListener("click", (e : MouseEvent) => {
        if(this.listContainer.lastChild){
            this.listContainer.removeChild(this.listContainer.lastChild);
        }
    });

    buttons[2].addEventListener("click", (e : MouseEvent) => {
        this.onEnter();
    })
}