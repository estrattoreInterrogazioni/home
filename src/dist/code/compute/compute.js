import { subjectGroup, dayList } from "../jsonFile/jsonFileFormat.js";
import { getPeople, getDaySubjectList } from "./getComputeStructures.js";
import { considerPastEvents } from "./considerPastEvents.js";
import { log } from "../console.js";
function getWeekDay(day, num) {
    return (day.getDay() - 1 + num) % 6;
}
export function compute(json, day) {
    var _a, _b;
    if (json.people) {
        if (json.subjects) {
            if (json.waitTime > 0) {
                if (json.planFor > 0) {
                    var peopleLists = getPeople(json);
                    var daySubjectList = getDaySubjectList(json);
                    var untouchables = [];
                    untouchables.length = json.waitTime + 1;
                    untouchables.fill([]);
                    var agenda = [];
                    considerPastEvents(json, peopleLists, daySubjectList, untouchables, agenda, day);
                    {
                        var subList_1 = [];
                        var chosenPeople_1 = [];
                        var isContained = void 0;
                        var weekDay = void 0;
                        var tempAgendaDate = new Date(day);
                        tempAgendaDate.setDate(tempAgendaDate.getDate() - 1);
                        for (var count = 0; count < json.planFor; count++) {
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
                            for (var _i = 0, _c = daySubjectList[weekDay]; _i < _c.length; _i++) {
                                var sub = _c[_i];
                                subList_1 = peopleLists.get(sub.name);
                                chosenPeople_1 = [];
                                var _loop_1 = function (j) {
                                    isContained = false;
                                    if (untouchables.find(function (value) {
                                        return value.includes(subList_1[j]);
                                    })) {
                                        isContained = true;
                                    }
                                    if (isContained &&
                                        (subList_1.length - (j + 1) - (sub.number - chosenPeople_1.length) >= 0)) {
                                        return "continue";
                                    }
                                    else {
                                        chosenPeople_1.push(subList_1[j]);
                                        if (chosenPeople_1.length >= sub.number) {
                                            return "break";
                                        }
                                    }
                                };
                                for (var j = 0; j < subList_1.length; j++) {
                                    var state_1 = _loop_1(j);
                                    if (state_1 === "break")
                                        break;
                                }
                                peopleLists.set(sub.name, (_a = peopleLists.get(sub.name)) === null || _a === void 0 ? void 0 : _a.filter(function (value) {
                                    return !chosenPeople_1.includes(value);
                                }));
                                untouchables[count % (json.waitTime + 1)] = untouchables[count % (json.waitTime + 1)].concat(chosenPeople_1);
                                (_b = agenda.at(-1)) === null || _b === void 0 ? void 0 : _b.tests.push(new subjectGroup(sub.name, chosenPeople_1));
                            }
                        }
                    }
                    for (var _d = 0, agenda_1 = agenda; _d < agenda_1.length; _d++) {
                        var el = agenda_1[_d];
                        el.tests = el.tests.filter(function (value) { var _a; return ((_a = value.people) === null || _a === void 0 ? void 0 : _a.length) != 0; });
                    }
                    return agenda;
                }
                else {
                    log("json.planFor: " + json.planFor + " <= 0");
                }
            }
            else {
                log("json.waiTime: " + json.waitTime + " + <= 0");
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
