import { createAgenda } from "./createAgenda.js";
import { setAgendaMonth } from "./setAgendaMonth.js";
import { setAgendaSwipeEvent } from "./monthSelector.js";
export class agenda {
    agendaEl;
    monthEl;
    buttonLeft;
    buttonRight;
    day;
    agendaData;
    constructor(agendaEl, monthEl, buttonLeft, buttonRight, day, agendaData = []) {
        this.agendaEl = agendaEl;
        this.monthEl = monthEl;
        this.buttonLeft = buttonLeft;
        this.buttonRight = buttonRight;
        this.day = day;
        this.agendaData = agendaData;
    }
    createAgenda = createAgenda.bind(this);
    setAgendaMonth = setAgendaMonth.bind(this);
    setAgendaSwipeEvent = setAgendaSwipeEvent.bind(this);
}
