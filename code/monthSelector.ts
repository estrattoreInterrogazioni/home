import {setAgendaMonth} from "./setAgendaMonth.js"

export function setAgendaSwipeEvent(
    buttonLeft : HTMLButtonElement,
    buttonRight : HTMLButtonElement,
    monthEl : HTMLElement,
    titles : HTMLCollectionOf<HTMLElement>){
    
    buttonLeft.addEventListener("click", e => {
        setAgendaMonth(-1, monthEl, titles);
    });
    
    buttonRight.addEventListener("click", e => {
        setAgendaMonth(1, monthEl, titles);
    });
}