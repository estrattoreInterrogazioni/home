import {subjectGroup, jsonFileFormat, dayList} from "../jsonFile/jsonFileFormat.js"

import {sortPeople} from "./sortPeople.js"
import {getPeople, getDaySubjectList} from "./getComputeStructures.js"

import {considerPastEvents} from "./considerPastEvents.js"

import { log } from "../log.js"

/* ------ REGOLE DEL SORTEGGIO ------ (se possibile rispettarle)
- solo un'interrogazione nello stesso giorno
- dopo un'interrogazione non si può essere sorteggiati nei {{json.waitTime}} giorni successivi
*/

function getWeekDay(day : Date, num : number){
  return (day.getDay()-1+num)%6
  //num parte da 0 (0=lun, 1=mart, ..., 5=sab), getDay() parte da 1, %6 e non 7 perché la domenica non si conta
}

//calcola i sorteggiati
export function compute(json: jsonFileFormat, day: Date){
  //agenda è la lista delle interrgoazioni, serve per visualizzare nel DOM)
  if (json.people) {
    if (json.subjects) {
      if(json.waitTime > 0){
        if(json.planFor > 0) {

      json.people = sortPeople(json)

      let peopleLists = getPeople(json)
      let daySubjectList = getDaySubjectList(json)

      let untouchables: string[][] = [] //persone preferibilmente non interrogabili
      untouchables.length = json.waitTime+1
      untouchables.fill([])

      let agenda : dayList[] = []

      debugger

      considerPastEvents(json, peopleLists, daySubjectList, untouchables, agenda, day)

      debugger

      { //determina la lista di interrogati futuri
        let subList: Array<string> = []
        let chosenPeople: Array<string> = []
        
        let isContained : boolean

        let weekDay : number

        let tempAgendaDate =  new Date(day)
        tempAgendaDate.setDate(tempAgendaDate.getDate()-1)

        for (let count = 0; count < json.planFor; count++) { //per ogni giorno, per json.planFor volte
          
          if(count >= json.waitTime+1){
            //se il numero dei giorni passati è maggiore del waitTime è scaduta l'immunità 
            untouchables[count%(json.waitTime+1)] = []
          }
          if(count != 0 && count % 6 == 0){
            //visto che non si conta la domenica quando si passa da sabato a lunedì 
            untouchables[(count%(json.waitTime+1))+1] = []
          }

          weekDay = getWeekDay(day, count)

          tempAgendaDate.setDate(tempAgendaDate.getDate()+1)
          if(tempAgendaDate.getDay()==0){
            tempAgendaDate.setDate(tempAgendaDate.getDate()+1)
          }
          agenda.push(new dayList(new Date(tempAgendaDate),[]))

          for (let sub of daySubjectList[weekDay]) { //per ogni materia del giorno, mod 6 e non 7 perché non si conta la domenica
            subList = <string[]>peopleLists.get(sub.name) //prendi la lista di persone interrogabili
            chosenPeople = []

            //per ogni presona, a partire da quelle con "score" più alta
            for (let j = 0; j < subList.length; j++) {

              isContained = false
              
              if(untouchables.find( value => {
                return value.includes(subList[j])
              })){
                isContained = true
              }

              if (
                isContained &&
                (subList.length - (j+1) - (sub.number - chosenPeople.length) >= 0)
              ) { //se la persona è contenuta tra gli intoccabili e ci sono altre persone interrogabili
                continue
              } else {
                chosenPeople.push(subList[j]) //interroga la persona
                if (chosenPeople.length >= sub.number) {
                  break
                }
              }
            }

            peopleLists.set(sub.name, <string[]>peopleLists.get(sub.name)?.filter(value=>{
              return !chosenPeople.includes(value)
            }))

            untouchables[count%(json.waitTime+1)] = untouchables[count%(json.waitTime+1)].concat(chosenPeople)

            agenda.at(-1)?.tests.push(new subjectGroup(sub.name, chosenPeople))
          }
        }
      }

      for(let el of agenda){
        el.tests = el.tests.filter(value => 
          value.people?.length != 0
        )
      }

      return agenda

    }else {
      log(`json.planFor: ${json.planFor} <= 0`)
    }
    }else {
      log(`json.waiTime: ${json.waitTime} + <= 0`)
    }
    } else {
      log("no json.subjects")
    }
  } else {
    log("no json.people")
  }
}