import { createAgenda } from "./createAgenda.js";
import { setAgendaMonth } from "./setAgendaMonth.js";
import { setAgendaSwipeEvent } from "./monthSelector.js";
var agenda = (function () {
    function agenda(agendaEl, monthEl, buttonLeft, buttonRight, date, agendaData) {
        if (agendaData === void 0) { agendaData = []; }
        this.createAgenda = createAgenda.bind(this);
        this.setAgendaMonth = setAgendaMonth.bind(this);
        this.setAgendaSwipeEvent = setAgendaSwipeEvent.bind(this);
        this.agendaEl = agendaEl;
        this.monthEl = monthEl;
        this.buttonLeft = buttonLeft;
        this.buttonRight = buttonRight;
        this.date = date;
        this.day = this.date.getDate();
        this.date.setDate(1);
        this.agendaData = agendaData;
    }
    return agenda;
}());
export { agenda };
