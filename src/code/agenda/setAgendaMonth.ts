import { agenda } from "./agenda.js"
import { isLesserDate, isSameDate } from "../compute/dateOp.js"

export function setAgendaMonth(this: agenda, num: number) {
  this.day.setMonth(this.day.getMonth()+num)
  let dayIter = new Date(this.day.getFullYear(), this.day.getMonth(), 1)

  this.monthEl.innerText = dayIter.toLocaleDateString("default", {
    month: "long",
    year: "numeric",
  })

  dayIter.setDate(dayIter.getDate() - (dayIter.getDay() - 1)) //il giorno è di sicuro lunedì
  let tempDay = new Date(dayIter)

  let titles = <HTMLElement[]>(
    (<unknown>document.getElementsByClassName("title"))
  )


  for (let i of titles) { //aggiorna il titolo
    i.innerText =
      dayIter.getDate().toString() +
      "\n" +
      dayIter.toLocaleDateString("default", {
        weekday: "long",
      })

    dayIter.setDate(dayIter.getDate() + 1)
    if (dayIter.getDay() == 0) {
      //non si conta la domenica
      // 0 == domenica
      dayIter.setDate(dayIter.getDate() + 1)
    }
  }


  if(this.agendaData.length != 0)
  {
    let stri: string
    let texts = <HTMLElement[]><unknown>document.getElementsByClassName("text")
    for(let x of texts){
      x.innerHTML = ""
    }

    dayIter = tempDay

    //trova l'indice del primo evento avvenuto prima di this.day 
    for (var i = this.agendaData.length - 1; i >= 0; i--) {
      if (isLesserDate(this.agendaData[i].day, dayIter)) {
        break
      }
    }
      i += 1 //primo evento per cui evento.day >= this.day 

    for (let j = 0; j < titles.length; j++) {
      if(i>=this.agendaData.length){
        break
      }
      //se il text selezionato coincide in termin cronologici
      //con la data dell'evento allora mostra i dati dell'evento
      if (isSameDate(dayIter, this.agendaData[i].day)) {
        for (let sub of this.agendaData[i].tests) {
          
          stri =/*html*/`
            <div class="tag v">
              <div class="tagTitle">
                ${sub.subject}
              </div>`

          for (let person of <string[]>sub.people) {
            stri += `<div>${person}</div>`
          }
          stri += "</div>"
          texts[j].innerHTML += stri
        }
        i += 1 //passa al prossimo evento nella lista
      }

      dayIter.setDate(dayIter.getDate() + 1)
      if (dayIter.getDay() == 0) {
        //non si conta la domenica
        // == domenica
        dayIter.setDate(dayIter.getDate() + 1)
      }
    }
  }
}
