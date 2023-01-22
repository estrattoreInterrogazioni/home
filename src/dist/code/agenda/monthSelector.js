export function setAgendaSwipeEvent() {
    var _this = this;
    this.buttonLeft.addEventListener("click", function (e) {
        _this.setAgendaMonth(-1);
    });
    this.buttonRight.addEventListener("click", function (e) {
        _this.setAgendaMonth(1);
    });
}
