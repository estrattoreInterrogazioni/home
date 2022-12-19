import { createAgenda } from "./createAgenda.js";
import { setAgendaMonth } from "./setAgendaMonth.js";
import { setAgendaSwipeEvent } from "./monthSelector.js";
export class agenda {
    constructor(agendaEl, monthEl, titles, buttonLeft, buttonRight, day) {
        this.createAgenda = createAgenda.bind(this);
        this.setAgendaMonth = setAgendaMonth.bind(this);
        this.setAgendaSwipeEvent = setAgendaSwipeEvent.bind(this);
        this.agendaEl = agendaEl;
        this.monthEl = monthEl;
        this.titles = titles;
        this.buttonLeft = buttonLeft;
        this.buttonRight = buttonRight;
        this.day = day;
    }
}
//# sourceMappingURL=agenda.js.map