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
            



        }else {
            console.error("no json.subjects");
        }
    } else{
        console.error("no json.people");
    }
}