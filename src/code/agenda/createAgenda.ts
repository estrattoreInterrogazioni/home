import { agenda } from "./agenda.js";

export function createAgenda(this: agenda) {
  /*'
    <div class="h week">'
        '<div class="v day">'
            '<div class="title">Lunedì</div>'
            '<div class="text" contenteditable>'
                '<div class="tag v">'
                    '<div>Luca</div>'
                    '<div>Matteo</div>'
                '</div>'
            '</div>'
        '</div>'
    '</div>'
    */

  var dayEl = document.createElement("div");
  dayEl.setAttribute("class", "v day");
  dayEl.innerHTML = /*html*/ `
        <div class="title">Lunedì</div>
        <div class="text">
            <div class="tag v">
                <div>Luca</div>
                <div>Matteo</div>
            </div>
        </div>`;

  var weekEl = document.createElement("div");
  weekEl.setAttribute("class", "h week");

  for (var i = 0; i < 6; i++) {
    weekEl.appendChild(dayEl.cloneNode(true));
  }
  for (var i = 0; i < 5; i++) {
    this.agendaEl.appendChild(weekEl.cloneNode(true));
  }

  this.setAgendaMonth(0);
  this.setAgendaSwipeEvent();
}
