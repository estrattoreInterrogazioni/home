import {list} from "./list.js";

export function onEnter(this : list){
    var div = document.createElement("div");
    div.innerText = this.listEl.value;
}