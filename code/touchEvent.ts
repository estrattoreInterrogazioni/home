import {setAgendaMonth} from "./setAgendaMonth.js"

var start : number;
var isMousemoving : boolean = false;
const threshold : number = 10;

export function setAgendaSwipeEvent(
    agenda : HTMLElement,
    monthEl : HTMLElement,
    titles : HTMLCollectionOf<HTMLElement>){

    agenda.addEventListener("mouseup", (e : MouseEvent) => {
        start = e.clientX;
    });

    agenda.addEventListener("mousemove", (e : MouseEvent) => {
        if(Math.abs(start-e.clientX)>(threshold/2.0))
        isMousemoving = true;
    });

    agenda.addEventListener("mousedown", (e : MouseEvent) => {
        if((Math.abs(start - e.clientX) >= threshold)
         && isMousemoving){ //change agenda month
            if(start < e.clientX){ //right
                setAgendaMonth(-1, monthEl, titles);
            } else { //left
                setAgendaMonth(1, monthEl, titles);
            }
        }
        isMousemoving = false;
    });
}