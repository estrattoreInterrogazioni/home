import {subject, jsonFileFormat} from "../jsonFile/jsonFileFormat.js"
import {sortPeople} from "./sortPeople.js"

// ritorna una mappa tra materia e persone non interrogate
export function getPeople(json: jsonFileFormat) {
    let personList: string[] = []

    var peopleLists: Map<string, Array<string>> = new Map()
    for (let i = 0; i < (<subject[]>json.subjects).length; i++) {
      for (let i of sortPeople(json)) {
        personList.push(i.name)
      }
      peopleLists.set((<subject[]>json.subjects)[i].name, personList)
      personList = []
    }
  
    return peopleLists
  }
  
  // ritorna un array di 6 elementi (da lun a sab), la domenica non avvengono interrogazioni
  // ogni elemento è un array con il nome delle materie in quel giorno
export function getDaySubjectList(json: jsonFileFormat) {
    var daySubjectList: subject[][] = []
    for (let i = 0; i < 6; i++) {
      daySubjectList.push([])
    }
  
    for (let sub of <subject[]>json.subjects) {
      for (let i of sub.days) {
        daySubjectList[i - 1].push({...sub})
      }
    }
  
    return daySubjectList
  }
  