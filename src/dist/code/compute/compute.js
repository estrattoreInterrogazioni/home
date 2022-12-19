class person {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
}
class subject {
    constructor(name, number, days) {
        this.name = name;
        this.number = number;
        this.days = days;
    }
}
class past {
    constructor(subject, people, date) {
        this.subject = subject;
        this.people = people;
        this.date = date;
    }
}
export class jsonFileFormat {
    constructor(people, subjects, past) {
        this.people = people;
        this.subjects = subjects;
        this.past = past;
    }
}
export function compute(json) {
    if (json.people) {
        if (json.subjects) {
            var texts = document.getElementsByClassName("text");
        }
        else {
            console.error("no json.subjects");
        }
    }
    else {
        console.error("no json.people");
    }
}
//# sourceMappingURL=compute.js.map