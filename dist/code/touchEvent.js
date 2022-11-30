import { setAgendaMonth } from "./setAgendaMonth.js";
var start;
var isMousemoving = false;
const threshold = 10;
export function setAgendaSwipeEvent(agenda, monthEl, titles) {
    agenda.addEventListener("mouseup", (e) => {
        start = e.clientX;
    });
    agenda.addEventListener("mousemove", (e) => {
        if (Math.abs(start - e.clientX) > (threshold / 2.0))
            isMousemoving = true;
    });
    agenda.addEventListener("mousedown", (e) => {
        if ((Math.abs(start - e.clientX) >= threshold)
            && isMousemoving) {
            if (start < e.clientX) {
                setAgendaMonth(-1, monthEl, titles);
            }
            else {
                setAgendaMonth(1, monthEl, titles);
            }
        }
        isMousemoving = false;
    });
}
//# sourceMappingURL=touchEvent.js.map