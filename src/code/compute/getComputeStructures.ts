import {person, subject, jsonFileFormat} from "../jsonFile/jsonFileFormat.js"

// ritorna una mappa tra materia e persone non interrogate
export function getPeople(json: jsonFileFormat) {
    let personList: string[] = []
    for (let i of <person[]>json.people) {
      personList.push(i.name)
    }
  
    var peopleLists: Map<string, Array<string>> = new Map()
    for (let i = 0; i < (<subject[]>json.subjects).length; i++) {
      peopleLists.set((<subject[]>json.subjects)[i].name, personList)
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
  