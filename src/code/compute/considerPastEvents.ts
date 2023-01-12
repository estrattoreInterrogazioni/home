import {subject, dayList, subjectGroup, jsonFileFormat} from "../jsonFile/jsonFileFormat.js"

import {isLesserDate, isSameDate} from "./dateOp.js"

import { log } from "../log.js"

export function considerPastEvents(
    json: jsonFileFormat,
    peopleLists: Map<string, string[]>,
    daySubjectList: subject[][],
    untouchables: string[][],
    agenda: dayList[],
    day: Date
  ) {
    if (json.past) {

      //filtra dalla lista per materia delle persone interrogabili quelle già interrogate
      for (let event of json.past) {
        peopleLists.set(event.subject, <string[]>peopleLists.get(event.subject)?.filter(value => {
          return !event.people.includes(value)
        }))
      }
  
      //controlla se sono in ordine cronologico (dal più recente)
      {
        let mem = day.getTime()
        let sec
        for (let event of json.past) {
          sec = new Date(event.date).getTime()
          if (sec > mem) {
            console.error("json.past non è in ordine cronologico (dal più recente)")
            throw "" //ferma js
          }
          mem = sec
        }
      }
      
      //determina le persone preferibilmente non interrogabili in base a json.waitTime
      {
        let now = day.getTime()
        let dayDiff : number
        if(isLesserDate(day, new Date(json.past[0].date))) {
          console.warn("json.past gli eventi non sono ancora avvenuti il " + day.toDateString())
        }

        for (let event of json.past) {
          dayDiff = Math.ceil(
            //calcola la differenza in giorni tra ora e l'evento passato
            (now - new Date(event.date).getTime()) / (1000 * 3600 * 24)
          )
          if (dayDiff <= json.waitTime) {
            //se la differenza rientra nel waitTime allora le persone non possono essere interrogate
            untouchables[untouchables.length-dayDiff] = untouchables[untouchables.length-dayDiff].concat(event.people)
          } else {
            break /*le date sono dalla più recente alla più antica, se dayDiff supera waitTime
                    allora anche dayDiff della data successiva supererà waitTime*/
          }
        }
      }

      //crea una lista delle persone interrogate (servirà per mostrarle nell'agenda)
      {
        let i = json.past.length - 1 //indice dell'ultimo elemento
        let tempDate = new Date(json.past[i].date) //data dell'interrogazione più remota
        let tempGroup: subjectGroup[] = [] //raggruppa gli eventi avvenuti in una stessa data
        for (; i >= 0; i--) {
          if (isSameDate(tempDate, new Date(json.past[i].date))) {
            //se la data dell'evento precedente è uguale a quella di ora
            tempGroup.push(
              new subjectGroup(json.past[i].subject, json.past[i].people)
            )
          } else {
            //l'evento di ora è avvenuto in un'altra data rispetto agli eventi precedenti
            agenda.push(new dayList(new Date(tempDate), tempGroup))
            tempGroup = []
            tempGroup.push(
              new subjectGroup(json.past[i].subject, json.past[i].people)
            )
          }
          tempDate = new Date(json.past[i].date)
        }
        if(tempGroup.length > 0){
          agenda.push(new dayList(new Date(tempDate), tempGroup))
        }
      }
  
      //rimuovi le materie in cui sono stati interrogati già tutti
      for (let sub of <subject[]>json.subjects) {
        //per ogni materia
        if (peopleLists.get(sub.name)?.length == 0) {
          //se la lista delle persone interrogabili è nulla
          for (let day of daySubjectList) {
            // per ogni giorno della lista delle materie
            day = day.filter(value => {
              return value.name != sub.name //rimuovi la materia senza interrogabili
              //(filtra se sono uguali)
            })
          }
        }
      }
    } else {
      log(json, "no json.past")
    }
  }