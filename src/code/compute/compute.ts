class person {
    name;
    score;
    constructor(name : string, score : number){
        this.name = name;
        this.score = score;
    }
}

class subject {
    name;
    number;
    days;
    constructor(name : string, number : number, days : Array<number>){
        this.name = name;
        this.number = number;
        this.days = days;
    }
}

class past {
    subject;
    people;
    date;
    constructor(subject : string, people : Array<string>, date : string){
        this.subject = subject;
        this.people = people;
        this.date = date;
    }
}

export class jsonFileFormat {
    people;
    subjects;
    past;
    constructor(people : Array<person> | undefined, subjects : Array<subject>  | undefined, past : Array<past> | undefined){
        this.people = people;
        this.subjects = subjects;
        this.past = past;
    }
}

export function compute(json : jsonFileFormat){
    if(json.people){
        if(json.subjects){
            
            {
                json.people.sort((a, b) => (b.score*Math.random() - a.score*Math.random())); //ordine decrescente per score

                let personList : Array<string> = [];
                for(let i of json.people){
                    personList.push(i.name);
                }

                var personLists : Map<string, Array<string>> = new Map();
                for(let i=0; i<json.subjects.length; i++){
                personLists.set(json.subjects[i].name, personList);
                } 
            }

            var daySubjectList : Array<Array<subject>> = [];
            for(let i=0; i<6; i++){
                daySubjectList.push([]);
            }
            for(let sub of json.subjects){
                for(let i of sub.days){
                    daySubjectList[i-1].push(sub);
                }
            }

            
            {
                let subList : Array<string> = [];
                let untouchables : Array<string> = [];
                let chosePeople : Array<string> = [];

                /*let date = new Date();
                date = new Date(date.getFullYear(), date.getMonth(), 1);
                date.setDate(date.getDate() - (date.getDay() - 1));*/


                let texts = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("text");

                for(let day=0; day<daySubjectList.length; day++){
                    if(day%2==0) {
                        untouchables = [];
                    }
                    for(let sub of daySubjectList[day]){
                        subList = <Array<string>>personLists.get(sub.name);
                        chosePeople = [];
                        
                            for(let j=0; j<subList.length; j++){
                                if(untouchables.indexOf(subList[j]) >= 0 && // contains
                                    subList.length-j-1-(sub.number-chosePeople.length) >= 0){ // ci sono altre persone disponibili
                                        continue;
                                } else {
                                    chosePeople.push(subList[j]);
                                    if(chosePeople.length >= sub.number){
                                        break;
                                    }
                                }
                            }
                            untouchables = untouchables.concat(chosePeople);

                            let stri = 
                             /*html*/ `
                                    <div class="tag v">
                                        <div class="tagTitle">` + sub.name + /*html*/ `</div>`;
                            for(let x of chosePeople){
                                stri += "<div>" + x + "</div>";
                            }
                            stri += "</div>";
                            texts[day].innerHTML += stri;
                    }
                }
            }
        }else {
            console.error("no json.subjects");
        }
    } else{
        console.error("no json.people");
    }
}