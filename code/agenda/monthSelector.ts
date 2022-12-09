import {agenda} from "./agenda.js"

export function setAgendaSwipeEvent(this : agenda){
    this.buttonLeft.addEventListener("click", (e : MouseEvent) => {
        this.setAgendaMonth(-1);
    });
    
    this.buttonRight.addEventListener("click", (e : MouseEvent) => {
        this.setAgendaMonth(1);
    });
}