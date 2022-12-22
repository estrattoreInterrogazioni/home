class person {
  name;
  score;
  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }
}

class subject {
  name;
  number;
  days;
  constructor(name: string, number: number, days: Array<number>) {
    this.name = name;
    this.number = number;
    this.days = days;
  }
}

class past {
  subject;
  people;
  date;
  constructor(subject: string, people: Array<string>, date: string) {
    this.subject = subject;
    this.people = people;
    this.date = date;
  }
}

export class jsonFileFormat {
  waitTime;
  people;
  subjects;
  past;
  constructor(
    waitTime: number,
    people: Array<person> | undefined,
    subjects: Array<subject> | undefined,
    past: Array<past> | undefined
  ) {
    this.waitTime = waitTime;
    this.people = people;
    this.subjects = subjects;
    this.past = past;
  }
}

class subjectGroup {
  title;
  people;
  constructor(title : string | undefined, people : string[] | undefined){
    this.title = title;
    this.people = people;
  }
}

class agendaList {
  day;
  data;
  constructor(day : Date, data : subjectGroup[]){
    this.day = day;
    this.data = data;
  }
}

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

function sortPeople(json: jsonFileFormat) {
  (<person[]>json.people).sort((a, b) => {
    var c = b.score - a.score;
    if (c == 0) {
      return Math.round(Math.random()) * 2 - 1; // 50% 1 oppure -1
    } else {
      return c;
    }
  }); //ordine decrescente per score
}

function considerPastEvents(
  json: jsonFileFormat,
  peopleLists: Map<string, string[]>,
  untouchables: string[],
  day: Date
) {
  if (json.past) {
    for (let event of json.past) {
      peopleLists.get(event.subject)?.filter((value: string) => {
        for (let person of event.people) {
          if (value == person) {
            return false;
          }
        }
        return true;
      });
    }

    //controlla se sono in ordine cronoligico (dal più recente)
    {
      let mem = day.getSeconds();
      let sec;
      for (let event of json.past) {
        sec = new Date(event.date).getSeconds();
        if (sec > mem) {
          alert("json.past non è in ordine cronologico (dal più recente)")
          throw(""); //stop
        }
        mem = sec;
      }
    }

    {
      let now = day.getSeconds();
      let dayDiff;
      for (let event of json.past) {
        dayDiff = Math.ceil(
          Math.abs(new Date(event.date).getSeconds() - now) / (60 * 60 * 24)
        );
        if (dayDiff >= json.waitTime) {
          for (let person of event.people) {
            untouchables.push(person);
          }
        } else {
          break;
        }
      }
    }

    var agenda : agendaList;
    let i=json.past.length-1;
    let date = new Date(json.past[i].date);
    let size = Math.ceil(Math.abs(day.getSeconds()-date.getSeconds()) / (60*60*24));
    let arr : subjectGroup[];
    for(; i>=0; i--){
      
    }

  } else {
    console.log(json, "no json.past");
  }
}

export function compute(json: jsonFileFormat, day: Date) {
  if (json.people) {
    if (json.subjects) {
      sortPeople(json);

      var peopleLists = getPeople(json);
      var daySubjectList = getDaySubjectList(json);

      var untouchables: Array<string> = [];
      considerPastEvents(json, peopleLists, untouchables, day);

      {
        let subList: Array<string> = [];
        let chosePeople: Array<string> = [];

        /*let date = new Date();
                date = new Date(date.getFullYear(), date.getMonth(), 1);
                date.setDate(date.getDate() - (date.getDay() - 1));*/

        let texts = <HTMLCollectionOf<HTMLElement>>(
          document.getElementsByClassName("text")
        );

        for (let day = 0; day < daySubjectList.length; day++) {
          if (day % 2 == 0) {
            untouchables = [];
          }
          for (let sub of daySubjectList[day]) {
            subList = <Array<string>>peopleLists.get(sub.name);
            chosePeople = [];

            for (let j = 0; j < subList.length; j++) {
              if (
                untouchables.indexOf(subList[j]) >= 0 && // contains
                subList.length - j - 1 - (sub.number - chosePeople.length) >= 0
              ) {
                // ci sono altre persone disponibili
                continue;
              } else {
                chosePeople.push(subList[j]);
                if (chosePeople.length >= sub.number) {
                  break;
                }
              }
            }
            untouchables = untouchables.concat(chosePeople);

            let stri =
              /*html*/ `
                <div class="tag v">
                  <div class="tagTitle">` +
              sub.name +
              "</div>";
            for (let x of chosePeople) {
              stri += "<div>" + x + "</div>";
            }
            stri += "</div>";
            texts[day].innerHTML += stri;
          }
        }
      }
    } else {
      alert("no json.subjects");
    }
  } else {
    alert("no json.people");
  }
}
