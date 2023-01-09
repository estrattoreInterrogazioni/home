class person {
    name;
    score;
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
}
class subject {
    name;
    number;
    days;
    constructor(name, number, days) {
        this.name = name;
        this.number = number;
        this.days = days;
    }
}
class past {
    subject;
    people;
    date;
    constructor(subject, people, date) {
        this.subject = subject;
        this.people = people;
        this.date = date;
    }
}
export class jsonFileFormat {
    planFor;
    waitTime;
    people;
    subjects;
    past;
    constructor(planFor, waitTime, people, subjects, past) {
        this.planFor = planFor;
        this.waitTime = waitTime;
        this.people = people;
        this.subjects = subjects;
        this.past = past;
    }
}
class subjectGroup {
    subject;
    people;
    constructor(subject, people) {
        this.subject = subject;
        this.people = people;
    }
}
export class dayList {
    day;
    tests;
    constructor(day, tests) {
        this.day = day;
        this.tests = tests;
    }
}
function sortPeople(json) {
    json.people.sort((a, b) => {
        let diff = b.score - a.score;
        if (diff == 0) {
            return Math.round(Math.random() * 3) - 1;
        }
        else {
            return diff;
        }
    });
}
function getPeople(json) {
    let personList = [];
    for (let i of json.people) {
        personList.push(i.name);
    }
    var peopleLists = new Map();
    for (let i = 0; i < json.subjects.length; i++) {
        peopleLists.set(json.subjects[i].name, personList);
    }
    return peopleLists;
}
function getDaySubjectList(json) {
    var daySubjectList = [];
    for (let i = 0; i < 6; i++) {
        daySubjectList.push([]);
    }
    for (let sub of json.subjects) {
        for (let i of sub.days) {
            daySubjectList[i - 1].push(sub);
        }
    }
    return daySubjectList;
}
export function isSameDate(d1, d2) {
    if (d1.getDate() == d2.getDate() &&
        d1.getMonth() == d2.getMonth() &&
        d1.getFullYear() == d2.getFullYear()) {
        return true;
    }
    return false;
}
export function isLesserDate(d1, d2) {
    if (d1.getHours() - d2.getHours() < 0 && !isSameDate(d1, d2)) {
        return true;
    }
    return false;
}
function considerPastEvents(json, peopleLists, daySubjectList, untouchables, agenda, day) {
    if (json.past) {
        for (let event of json.past) {
            peopleLists.set(event.subject, peopleLists.get(event.subject)?.filter((value) => {
                for (let person of event.people) {
                    if (value == person) {
                        return false;
                    }
                }
                return true;
            }));
        }
        {
            let mem = day.getSeconds();
            let sec;
            for (let event of json.past) {
                sec = new Date(event.date).getSeconds();
                if (sec > mem) {
                    console.log("json.past non è in ordine cronologico (dal più recente)");
                    throw "";
                }
                mem = sec;
            }
        }
        {
            let now = day.getHours();
            let dayDiff;
            if (isLesserDate(day, new Date(json.past[0].date))) {
                console.log("json.past gli eventi non sono ancora avvenuti il " + day.toDateString());
            }
            for (let event of json.past) {
                dayDiff = Math.ceil((now - new Date(event.date).getHours()) / 24);
                if (dayDiff <= json.waitTime) {
                    for (let person of event.people) {
                        untouchables[untouchables.length - dayDiff].push(person);
                    }
                }
                else {
                    break;
                }
            }
        }
        {
            let i = json.past.length - 1;
            let tempDate = json.past[i].date;
            let tempGroup = [];
            for (; i >= 0; i--) {
                if (tempDate == json.past[i].date) {
                    tempGroup.push(new subjectGroup(json.past[i].subject, json.past[i].people));
                }
                else {
                    agenda.push(new dayList(new Date(tempDate), tempGroup));
                    tempGroup = [];
                }
                tempDate = json.past[i].date;
            }
        }
        for (let sub of json.subjects) {
            if (peopleLists.get(sub.name)?.length == 0) {
                for (let day of daySubjectList) {
                    day = day.filter((value, index, arr) => {
                        return value.name != sub.name;
                    });
                }
            }
        }
    }
    else {
        console.log(json, "no json.past");
    }
}
function getWeekDay(day, num) {
    return (day.getDay() - 1 + num) % 6;
}
export function compute(json, day, agenda) {
    if (json.people) {
        if (json.subjects) {
            if (json.waitTime > 0) {
                if (json.planFor > 0) {
                    sortPeople(json);
                    var peopleLists = getPeople(json);
                    var daySubjectList = getDaySubjectList(json);
                    var untouchables = [];
                    for (let i = 0; i < json.waitTime + 1; i++) {
                        untouchables.push([]);
                    }
                    console.log("before considerPastEvents agenda: ", agenda);
                    considerPastEvents(json, peopleLists, daySubjectList, untouchables, agenda, day);
                    console.log("fuori da considerPastEvents untouchables: ", untouchables);
                    console.log("fuori da considerPastEvents agenda: ", agenda);
                    {
                        let subList = [];
                        let chosenPeople = [];
                        let isContained;
                        let weekDay;
                        let tempAgendaDate = new Date();
                        for (let count = 0; count < json.planFor; count++) {
                            if (count >= json.waitTime + 1) {
                                untouchables[count % (json.waitTime + 1)] = [];
                            }
                            if (count != 0 && count % 6 == 0) {
                                untouchables[(count % (json.waitTime + 1)) + 1] = [];
                            }
                            weekDay = getWeekDay(day, count);
                            tempAgendaDate.setHours(day.getHours() + (count * 24));
                            agenda.push(new dayList(tempAgendaDate, []));
                            for (let sub of daySubjectList[weekDay]) {
                                subList = peopleLists.get(sub.name);
                                chosenPeople = [];
                                for (let j = 0; j < subList.length; j++) {
                                    isContained = false;
                                    for (let arr of untouchables) {
                                        if (arr.indexOf(subList[j]) >= 0) {
                                            isContained = true;
                                            break;
                                        }
                                    }
                                    if (isContained &&
                                        (subList.length - (j + 1) - (sub.number - chosenPeople.length) >= 0)) {
                                        continue;
                                    }
                                    else {
                                        chosenPeople.push(subList[j]);
                                        if (chosenPeople.length >= sub.number) {
                                            break;
                                        }
                                    }
                                }
                                peopleLists.set(sub.name, peopleLists.get(sub.name)?.filter((value, index, arr) => {
                                    for (let x of chosenPeople) {
                                        if (value == x) {
                                            return false;
                                        }
                                    }
                                    return true;
                                }));
                                untouchables[count % (json.waitTime + 1)] = untouchables[count % (json.waitTime + 1)].concat(chosenPeople);
                                agenda.at(-1)?.tests.push(new subjectGroup(sub.name, chosenPeople));
                            }
                        }
                    }
                    console.log("compute agenda: ", agenda);
                }
                else {
                    console.log("json.planFor: " + json.planFor + " <= 0");
                }
            }
            else {
                console.log("json.waiTime: " + json.waitTime + " <= 0");
            }
        }
        else {
            console.log("no json.subjects");
        }
    }
    else {
        console.log("no json.people");
    }
}
//# sourceMappingURL=compute.js.map