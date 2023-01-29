import { agenda } from "./agenda.js"
import { isLesserDate, isSameDate } from "../compute/dateOp.js"

export function setAgendaMonth(this: agenda, num: number) {
  this.date.setMonth(this.date.getMonth()+num) //aggiorna la data
  let dayIter = new Date(this.date.getFullYear(), this.date.getMonth(), 1) //iteratore per calcloi successivi

  {
    //aggiorna il titolo del mese
    let str = dayIter.toLocaleDateString("default", {
      month: "long",
      year: "numeric",
    })
    this.monthEl.innerText = str.charAt(0).toUpperCase() + str.slice(1)
  }


  dayIter.setDate(dayIter.getDate() - (dayIter.getDay() - 1)) //il giorno è di sicuro lunedì
  let tempDay = new Date(dayIter) //servirà dopo per resettare l'iteratore



  let titles = <HTMLElement[]>(
    (<unknown>document.getElementsByClassName("title"))
  )
  for (let i of titles) { //aggiorna i titoli dei giorni
    i.innerText =
      dayIter.getDate().toString() +
      "\n" +
      dayIter.toLocaleDateString("default", {
        weekday: "long",
      })
    
    if(dayIter.getMonth() != this.date.getMonth()){
      //se questo giorno dell'agenda non è dello stesso mese selezionato (mese successivo o precedente, allora applica un altro stile)
      i.setAttribute("class", i.getAttribute("class") + " otherMonth")
    } else {
      let res = i.getAttribute("class")?.replace( " otherMonth", "")
      if(res){
        i.setAttribute("class", res)
      }
    }

    dayIter.setDate(dayIter.getDate() + 1)
    if (dayIter.getDay() == 0) {
      //non si conta la domenica
      // 0 == domenica
      dayIter.setDate(dayIter.getDate() + 1) //se è domenica vai a lunedì
    }
  }


  if(this.agendaData.length != 0)
  {
    let stri: string
    let texts = <HTMLElement[]><unknown>document.getElementsByClassName("text")
    for(let x of texts){
      x.innerHTML = ""
    }

    dayIter = tempDay //resetta l'iteratore

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
      //se il text selezionato coincide in termini cronologici
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
        dayIter.setDate(dayIter.getDate() + 1) //se è domenica vai a lunedì
      }
    }
  }
}
