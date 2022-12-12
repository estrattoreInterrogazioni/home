import { createList } from "./createList";
import { onEnter } from "./onEnter";

export class list {
    protected el : HTMLElement;
    protected listContainer : HTMLElement;
    constructor(el : HTMLInputElement){
        this.el = el;
    }

    createList = createList.bind(this);
    onEnter = onEnter.bind(this);
}