export function createAgenda() {
    var dayEl = document.createElement("div");
    dayEl.setAttribute("class", "v day");
    dayEl.innerHTML = "\n        <div class=\"title\"></div>\n        <div class=\"text\"></div>";
    var weekEl = document.createElement("div");
    weekEl.setAttribute("class", "h week");
    for (var i = 0; i < 6; i++) {
        weekEl.appendChild(dayEl.cloneNode(true));
    }
    for (var i = 0; i < 5; i++) {
        this.agendaEl.appendChild(weekEl.cloneNode(true));
    }
    this.setAgendaSwipeEvent();
}
