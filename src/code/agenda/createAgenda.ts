import { agenda } from "./agenda.js"

export function createAgenda(this: agenda) {
  /*struttura risultante:
  '<div id="agenda">'
    '<div class="h week">'
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
    '<div class="h week">'
        ...
    '</div>'
  </div>
    */

  var dayEl = document.createElement("div")
  dayEl.setAttribute("class", "v day")
  dayEl.innerHTML = /*html*/ `
        <div class="title"></div>
        <div class="text"></div>`

  var weekEl = document.createElement("div")
  weekEl.setAttribute("class", "h week")

  for (var i = 0; i < 6; i++) { //una settimana contiene 6 giorni (non si conta la domenica)
    weekEl.appendChild(dayEl.cloneNode(true))
  }
  for (var i = 0; i < 5; i++) { // un mese contiene per convenzione 5 settimane 
                                //(i giorni in eccesso visualizzano gli eventi
                                // del mese precedente e successivo)
    this.agendaEl.appendChild(weekEl.cloneNode(true))
  }

  this.setAgendaSwipeEvent() //ascolta e poi processa gli eventi onClick dei 
                             //bottoni "mese precedente/successivo"
}
