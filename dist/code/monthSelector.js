export function setAgendaSwipeEvent() {
    this.buttonLeft.addEventListener("click", (e) => {
        this.setAgendaMonth(-1);
    });
    this.buttonRight.addEventListener("click", (e) => {
        this.setAgendaMonth(1);
    });
}
//# sourceMappingURL=monthSelector.js.map