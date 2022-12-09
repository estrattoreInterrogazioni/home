import { onEnter } from "./onEnter";

export class list {
    protected listEl : HTMLInputElement;
    protected dataEl : HTMLElement;
    constructor(listEl : HTMLInputElement){
        this.listEl = listEl;
    }

    onEnter = onEnter.bind(this);
}