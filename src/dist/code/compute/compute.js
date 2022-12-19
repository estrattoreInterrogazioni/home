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
            {
                json.people.sort((a, b) => (b.score * Math.random() - a.score * Math.random()));
                let personList = [];
                for (let i of json.people) {
                    personList.push(i.name);
                }
                var personLists = new Map();
                for (let i = 0; i < json.subjects.length; i++) {
                    personLists.set(json.subjects[i].name, personList);
                }
            }
            var daySubjectList = [];
            for (let i = 0; i < 6; i++) {
                daySubjectList.push([]);
            }
            for (let sub of json.subjects) {
                for (let i of sub.days) {
                    daySubjectList[i - 1].push(sub);
                }
            }
            {
                let subList = [];
                let untouchables = [];
                let chosePeople = [];
                let texts = document.getElementsByClassName("text");
                for (let day = 0; day < daySubjectList.length; day++) {
                    if (day % 2 == 0) {
                        untouchables = [];
                    }
                    for (let sub of daySubjectList[day]) {
                        subList = personLists.get(sub.name);
                        chosePeople = [];
                        for (let j = 0; j < subList.length; j++) {
                            if (untouchables.indexOf(subList[j]) >= 0 &&
                                subList.length - j - 1 - (sub.number - chosePeople.length) >= 0) {
                                continue;
                            }
                            else {
                                chosePeople.push(subList[j]);
                                if (chosePeople.length >= sub.number) {
                                    break;
                                }
                            }
                        }
                        untouchables = untouchables.concat(chosePeople);
                        let stri = `
                                    <div class="tag v">
                                        <div class="tagTitle">` + sub.name + `</div>`;
                        for (let x of chosePeople) {
                            stri += "<div>" + x + "</div>";
                        }
                        stri += "</div>";
                        texts[day].innerHTML += stri;
                    }
                }
            }
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