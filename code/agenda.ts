import { setAgendaMonth } from "./setAgendaMonth.js";
import { setAgendaSwipeEvent } from "./monthSelector.js";

export function createAgenda(
  agenda: HTMLElement,
  monthEl: HTMLElement,
  titles : HTMLCollectionOf<HTMLElement>,
  buttonLeft : HTMLButtonElement,
  buttonRight : HTMLButtonElement) {
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
  
  dayEl.innerHTML = /*html*/ `

<div class="v day">
    <div class="title">Lunedì</div>
    <div class="text" contenteditable>
        <div class="tag v">
            <div>Luca</div>
            <div>Matteo</div>
        </div>
    </div>
</div>`

  var weekEl = document.createElement("div");
  weekEl.setAttribute("class", "h week");

  for (var i = 0; i < 7; i++) {
    weekEl.appendChild(dayEl.cloneNode(true));
  }
  for (var i = 0; i < 5; i++) {
    agenda.appendChild(weekEl.cloneNode(true));
  }

  setAgendaMonth(0, monthEl, titles);
  setAgendaSwipeEvent(buttonLeft, buttonRight, monthEl, titles);
}
