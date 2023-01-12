//componente di jsonFileFormat
export class person {
    name //nome della persona
    score //punteggio, rende più semplice l'algoritmo di pianificazione
    constructor(name: string, score: number) {
      this.name = name
      this.score = score
    }
  }
  //componente di jsonFileFormat
export class subject {
    name //nome della materia
    number //numero di persone prese per l'interrogazione
    days //indice dei giorni (1=lunedì, 2=martedì, ...)
    constructor(name: string, number: number, days: Array<number>) {
      this.name = name
      this.number = number
      this.days = days
    }
  }
  //componente di jsonFileFormat
  class past {
    //interrogazioni già avvenute
    subject //nome della materia
    people //nomi degli interrogati
    date //data (in stringa, es: 1/3/2022)
    constructor(subject: string, people: Array<string>, date: string) {
      this.subject = subject
      this.people = people
      this.date = date
    }
  }
  
  //il formato (utile solo per typescript) del json in input
  export class jsonFileFormat {
    planFor //tempo (in giorni) per cui deve avvenire la pianificazione delle interrogazioni (un limite)
    waitTime //tempo (in giorni) preferibile che deve trascorrere tra due interrogazioni,
    //della stessa persona, in giorni differenti
    people //oggetto[] delle persone interrogabili
    subjects //oggetto[] delle materie
    past //oggetto[] delle interrogazioni passate, già avvenute
    constructor(
      planFor: number,
      waitTime: number,
      people: Array<person> | undefined,
      subjects: Array<subject> | undefined,
      past: Array<past> | undefined
    ) {
      this.planFor = planFor
      this.waitTime = waitTime
      this.people = people
      this.subjects = subjects
      this.past = past
    }
  }

  //nomi delle persone scelte per una materia
export class subjectGroup {
  subject //nome della materia
  people //nomi delle persone
  constructor(subject: string | undefined, people: string[] | undefined) {
    this.subject = subject
    this.people = people
  }
}

export class dayList {
  //lista degli interrogati di una certa data divisi per materia
  day //data
  tests //oggetto[] subject (materia + persone interrogate)
  constructor(day: Date, tests: subjectGroup[]) {
    this.day = day
    this.tests = tests
  }
}