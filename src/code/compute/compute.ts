//componente di jsonFileFormat
class person {
  name; //nome della persona
  score; //punteggio, rende più semplice l'algoritmo di pianificazione
  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }
}
//componente di jsonFileFormat
class subject {
  name; //nome della materia
  number; //numero di persone prese per l'interrogazione
  days; //indice dei giorni (1=lunedì, 2=martedì, ...)
  constructor(name: string, number: number, days: Array<number>) {
    this.name = name;
    this.number = number;
    this.days = days;
  }
}
//componente di jsonFileFormat
class past {
  //interrogazioni già avvenute
  subject; //nome della materia
  people; //nomi degli interrogati
  date; //data (in stringa, es: 1/3/2022)
  constructor(subject: string, people: Array<string>, date: string) {
    this.subject = subject;
    this.people = people;
    this.date = date;
  }
}

//il formato (utile solo per typescript) del json in input
export class jsonFileFormat {
  planFor; //tempo (in giorni) per cui deve avvenire la pianificazione delle interrogazioni (un limite)
  waitTime; //tempo (in giorni) preferibile che deve trascorrere tra due interrogazioni,
  //della stessa persona, in giorni differenti
  people; //oggetto[] delle persone interrogabili
  subjects; //oggetto[] delle materie
  past; //oggetto[] delle interrogazioni passate, già avvenute
  constructor(
    planFor: number,
    waitTime: number,
    people: Array<person> | undefined,
    subjects: Array<subject> | undefined,
    past: Array<past> | undefined
  ) {
    this.planFor = planFor;
    this.waitTime = waitTime;
    this.people = people;
    this.subjects = subjects;
    this.past = past;
  }
}

//nomi delle persone scelte per una materia
class subjectGroup {
  subject; //nome della materia
  people; //nomi delle persone
  constructor(subject: string | undefined, people: string[] | undefined) {
    this.subject = subject;
    this.people = people;
  }
}

export class dayList {
  //lista degli interrogati di una certa data divisi per materia
  day; //data
  tests; //oggetto[] subject (materia + persone interrogate)
  constructor(day: Date, tests: subjectGroup[]) {
    this.day = day;
    this.tests = tests;
  }
}

function sortPeople(json: jsonFileFormat) {
  //ordine decrescente in base a "score"
  (<person[]>json.people).sort((a, b) => {
    let diff = b.score - a.score;
    if (diff == 0) {
      //se due persone hanno la stessa "score", forse invertire il loro ordine,
      //rende indeterminabile a priori i sorteggiati
      return Math.round(Math.random()*3) - 1;
      /*rand() genera un float tra 0 e 1, rand()*3 genera un float tra 0 e 3,
      applicando round() si ottiene 0 | 1 | 2 | 3, sottraendo -1 si ottiene -1 | 0 | 1 | 2
      se il numero è negativo b < a, se è nullo b = a, altrimenti b > a, =>
      25% (caso -1) b < a, 25% (caso 0) b == a, 50% (caso 1 | 2) b > a*/
    } else {
      return diff;
    }
  });
}

// ritorna una mappa tra materia e persone non interrogate
function getPeople(json: jsonFileFormat) {
  let personList: Array<string> = [];
  for (let i of <person[]>json.people) {
    personList.push(i.name);
  }

  var peopleLists: Map<string, Array<string>> = new Map();
  for (let i = 0; i < (<subject[]>json.subjects).length; i++) {
    peopleLists.set((<subject[]>json.subjects)[i].name, personList);
  }

  return peopleLists;
}

// ritorna un array di 6 elementi (da lun a sab), la domenica non avvengono interrogazioni
// ogni elemento è un array con il nome delle materie in quel giorno
function getDaySubjectList(json: jsonFileFormat) {
  var daySubjectList: Array<Array<subject>> = [];
  for (let i = 0; i < 6; i++) {
    daySubjectList.push([]);
  }
  for (let sub of <subject[]>json.subjects) {
    for (let i of sub.days) {
      daySubjectList[i - 1].push(sub);
    }
  }

  return daySubjectList;
}

export function isSameDate(d1: Date, d2: Date) {
  if (
    d1.getDate() == d2.getDate() &&
    d1.getMonth() == d2.getMonth() &&
    d1.getFullYear() == d2.getFullYear()
  ) {
    return true;
  }
  return false;
}

export function isLesserDate(d1: Date, d2: Date) {
  if (d1.getHours() - d2.getHours() < 0 && !isSameDate(d1, d2)) {
    return true;
  }
  return false;
}

function considerPastEvents(
  json: jsonFileFormat,
  peopleLists: Map<string, string[]>,
  daySubjectList: subject[][],
  untouchables: string[][],
  agenda: dayList[],
  day: Date
) {
  if (json.past) {
    for (let event of json.past) {
      //filtra dalla lista per materia delle persone interrogabili quelle già interrogate
      peopleLists.set(event.subject, <string[]>peopleLists.get(event.subject)?.filter((value: string) => {
        for (let person of event.people) {
          if (value == person) {
            return false;
          }
        }
        return true;
      }));
    }

    //controlla se sono in ordine cronoligico (dal più recente)
    {
      let mem = day.getSeconds();
      let sec;
      for (let event of json.past) {
        sec = new Date(event.date).getSeconds();
        if (sec > mem) {
          console.log("json.past non è in ordine cronologico (dal più recente)");
          throw ""; //ferma js
        }
        mem = sec;
      }
    }

    {
      //determina le persone preferibilmente non interrogabili in base a json.waitTime
      let now = day.getHours();
      let dayDiff : number;
      if(isLesserDate(day, new Date(json.past[0].date))) {
        console.log("json.past gli eventi non sono ancora avvenuti il " + day.toDateString());
      }
      for (let event of json.past) {
        dayDiff = Math.ceil(
          //calcola la differenza in giorni tra ora e l'evento passato
          (now - new Date(event.date).getHours()) / 24
        );
        if (dayDiff <= json.waitTime) {
          //se la differenza rientra nel waitTime allora le persone non possono essere interrogate
          for (let person of event.people) {
            untouchables[untouchables.length-dayDiff].push(person);
          }
        } else {
          break; /*le date sono dalla più recente alla più antica, se dayDiff supera waitTime
                  allora anche dayDiff della data successiva supererà waitTime*/
        }
      }
    }

    {
      // crea una lista delle persone interrogate (servirà per mostrarle nell'agenda)
      let i = json.past.length - 1; //indice dell'ultimo elemento
      let tempDate = json.past[i].date; //data dell'interrogazione più remota
      let tempGroup: subjectGroup[] = []; //raggruppa gli eventi avvenuti in una stessa data
      for (; i >= 0; i--) {
        if (tempDate == json.past[i].date) {
          //se la data dell'evento precedente è uguale a quella di ora
          tempGroup.push(
            new subjectGroup(json.past[i].subject, json.past[i].people)
          );
        } else {
          //l'evento di ora è avvenuto in un'altra data rispetto agli eventi precedenti
          agenda.push(new dayList(new Date(tempDate), tempGroup));
          tempGroup = [];
        }
        tempDate = json.past[i].date;
      }
    }

    //rimuovi le materie in cui sono stati interrogati già tutti
    for (let sub of <subject[]>json.subjects) {
      //per ogni materia
      if (peopleLists.get(sub.name)?.length == 0) {
        //se la lista delle persone interrogabili è nulla
        for (let day of daySubjectList) {
          // per ogni giorno della lista delle materie
          day = day.filter((value: subject, index: number, arr: subject[]) => {
            return value.name != sub.name; //rimuovi la materia senza interrogabili
            //(filtra se sono uguali)
          });
        }
      }
    }
  } else {
    console.log(json, "no json.past");
  }
}

function getWeekDay(day : Date, num : number){
  return (day.getDay()-1+num)%6;
  //num parte da 0 (0=lun, 1=mart, ...), getDay() parte da 1, %6 e non 7 perché la domenica non si conta
}



/* ------ REGOLE DEL SORTEGGIO ------ (se possibile rispettarle)
- solo un'interrogazione nello stesso giorno
- dopo un'interrogazione non si può essere sorteggiati nei {{json.waitTime}} giorni successivi
*/


//calcola i sorteggiati
export function compute(json: jsonFileFormat, day: Date, agenda : dayList[]){
  //agenda è la lista delle interrgoazioni, serve per visualizzare nel DOM)
  if (json.people) {
    if (json.subjects) {
      if(json.waitTime > 0){
        if(json.planFor > 0) {

      sortPeople(json);

      var peopleLists = getPeople(json);
      var daySubjectList = getDaySubjectList(json);

      var untouchables: string[][] = []; //persone preferibilmente non interrogabili
      for(let i=0; i<json.waitTime+1; i++){
        untouchables.push([]);
      }

      console.log("before considerPastEvents agenda: ", agenda);
      considerPastEvents(json, peopleLists, daySubjectList, untouchables, agenda, day);
      console.log("fuori da considerPastEvents untouchables: ", untouchables);
      console.log("fuori da considerPastEvents agenda: ", agenda);

      { //determina la lista di interrogati futuri
        let subList: Array<string> = [];
        let chosenPeople: Array<string> = [];
        let isContained : boolean;
        let weekDay : number;
        let tempAgendaDate =  new Date();
        for (let count = 0; count < json.planFor; count++) { //per ogni giorno, per json.planFor volte
          
          if(count >= json.waitTime+1){
            //se il numero dei giorni passati è maggiore del waitTime è scaduta l'immunità 
            untouchables[count%(json.waitTime+1)] = [];
          }
          if(count != 0 && count % 6 == 0){
            //visto che non si conta la domenica quando si passa da sabato a lunedì 
            untouchables[(count%(json.waitTime+1))+1] = [];
          }

          weekDay = getWeekDay(day, count);

          tempAgendaDate.setHours(day.getHours()+(count*24));
          agenda.push(new dayList(tempAgendaDate,[]));

          for (let sub of daySubjectList[weekDay]) { //per ogni materia del giorno, mod 6 e non 7 perché non si conta la domenica
            subList = <string[]>peopleLists.get(sub.name); //prendi la lista di persone interrogabili
            chosenPeople = [];

            //per ogni presona, a partire da quelle con "score" più alta
            for (let j = 0; j < subList.length; j++) {

              isContained = false;
              for(let arr of untouchables){ //controlla se la persona è intoccabile
                if(arr.indexOf(subList[j]) >= 0){
                  isContained = true;
                  break;
                }
              }

              if (
                isContained &&
                (subList.length - (j+1) - (sub.number - chosenPeople.length) >= 0)
              ) { //se la persona è contenuta tra gli intoccabili e ci sono altre persone interrogabili
                continue;
              } else {
                chosenPeople.push(subList[j]); //interroga la persona
                if (chosenPeople.length >= sub.number) {
                  break;
                }
              }
            }

            peopleLists.set(sub.name, <string[]>peopleLists.get(sub.name)?.filter((value : string, index : number, arr: string[])=>{
              for(let x of chosenPeople){
                if(value == x){
                  return false; // rimuovi dalla lista degli interrogabili la persona scelta 
                }
              }
              return true;
            }));

            untouchables[count%(json.waitTime+1)] = untouchables[count%(json.waitTime+1)].concat(chosenPeople);

            agenda.at(-1)?.tests.push(new subjectGroup(sub.name, chosenPeople));
          }
        }
      }
      console.log("compute agenda: ", agenda);
    }else {
      console.log("json.planFor: " + json.planFor + " <= 0");
    }
    }else {
      console.log("json.waiTime: " + json.waitTime + " <= 0");
    }
    } else {
      console.log("no json.subjects");
    }
  } else {
    console.log("no json.people");
  }
}