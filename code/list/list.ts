import { createList } from "./createList";

export class list {
    protected el : HTMLElement;
    protected listContainer : HTMLElement;

    constructor(el : HTMLElement, onEnter : () => void ){
        this.el = el;
        this.onEnter = onEnter;
        this.listContainer = document.createElement("div");
        this.createList();
    }

    createList = createList.bind(this);
    onEnter;
}