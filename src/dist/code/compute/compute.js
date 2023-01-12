import { subjectGroup, dayList } from "../jsonFile/jsonFileFormat.js";
import { sortPeople } from "./sortPeople.js";
import { getPeople, getDaySubjectList } from "./getComputeStructures.js";
import { considerPastEvents } from "./considerPastEvents.js";
import { log } from "../log.js";
function getWeekDay(day, num) {
    return (day.getDay() - 1 + num) % 6;
}
export function compute(json, day) {
    if (json.people) {
        if (json.subjects) {
            if (json.waitTime > 0) {
                if (json.planFor > 0) {
                    json.people = sortPeople(json);
                    let peopleLists = getPeople(json);
                    let daySubjectList = getDaySubjectList(json);
                    let untouchables = [];
                    untouchables.length = json.waitTime + 1;
                    untouchables.fill([]);
                    let agenda = [];
                    debugger;
                    considerPastEvents(json, peopleLists, daySubjectList, untouchables, agenda, day);
                    debugger;
                    {
                        let subList = [];
                        let chosenPeople = [];
                        let isContained;
                        let weekDay;
                        let tempAgendaDate = new Date(day);
                        tempAgendaDate.setDate(tempAgendaDate.getDate() - 1);
                        for (let count = 0; count < json.planFor; count++) {
                            if (count >= json.waitTime + 1) {
                                untouchables[count % (json.waitTime + 1)] = [];
                            }
                            if (count != 0 && count % 6 == 0) {
                                untouchables[(count % (json.waitTime + 1)) + 1] = [];
                            }
                            weekDay = getWeekDay(day, count);
                            tempAgendaDate.setDate(tempAgendaDate.getDate() + 1);
                            if (tempAgendaDate.getDay() == 0) {
                                tempAgendaDate.setDate(tempAgendaDate.getDate() + 1);
                            }
                            agenda.push(new dayList(new Date(tempAgendaDate), []));
                            for (let sub of daySubjectList[weekDay]) {
                                subList = peopleLists.get(sub.name);
                                chosenPeople = [];
                                for (let j = 0; j < subList.length; j++) {
                                    isContained = false;
                                    if (untouchables.find(value => {
                                        return value.includes(subList[j]);
                                    })) {
                                        isContained = true;
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
                                peopleLists.set(sub.name, peopleLists.get(sub.name)?.filter(value => {
                                    return !chosenPeople.includes(value);
                                }));
                                untouchables[count % (json.waitTime + 1)] = untouchables[count % (json.waitTime + 1)].concat(chosenPeople);
                                agenda.at(-1)?.tests.push(new subjectGroup(sub.name, chosenPeople));
                            }
                        }
                    }
                    for (let el of agenda) {
                        el.tests = el.tests.filter(value => value.people?.length != 0);
                    }
                    return agenda;
                }
                else {
                    log(`json.planFor: ${json.planFor} <= 0`);
                }
            }
            else {
                log(`json.waiTime: ${json.waitTime} + <= 0`);
            }
        }
        else {
            log("no json.subjects");
        }
    }
    else {
        log("no json.people");
    }
}
