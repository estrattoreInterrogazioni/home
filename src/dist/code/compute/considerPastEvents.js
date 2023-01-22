import { dayList, subjectGroup } from "../jsonFile/jsonFileFormat.js";
import { isLesserDate, isSameDate } from "./dateOp.js";
import { log, error } from "../console.js";
export function considerPastEvents(json, peopleLists, daySubjectList, untouchables, agenda, day) {
    var _a, _b;
    if (json.past) {
        var _loop_1 = function (event_1) {
            peopleLists.set(event_1.subject, (_a = peopleLists.get(event_1.subject)) === null || _a === void 0 ? void 0 : _a.filter(function (value) {
                return !event_1.people.includes(value);
            }));
        };
        for (var _i = 0, _c = json.past; _i < _c.length; _i++) {
            var event_1 = _c[_i];
            _loop_1(event_1);
        }
        {
            var mem = day.getTime();
            var sec = void 0;
            for (var _d = 0, _e = json.past; _d < _e.length; _d++) {
                var event_2 = _e[_d];
                sec = new Date(event_2.date).getTime();
                if (sec > mem) {
                    error("json.past non è in ordine cronologico (dal più recente)");
                    throw "";
                }
                mem = sec;
            }
        }
        {
            var now = day.getTime();
            var dayDiff = void 0;
            if (isLesserDate(day, new Date(json.past[0].date))) {
                console.warn("json.past gli eventi non sono ancora avvenuti il " + day.toDateString());
            }
            for (var _f = 0, _g = json.past; _f < _g.length; _f++) {
                var event_3 = _g[_f];
                dayDiff = Math.ceil((now - new Date(event_3.date).getTime()) / (1000 * 3600 * 24));
                if (dayDiff <= json.waitTime) {
                    untouchables[untouchables.length - dayDiff] = untouchables[untouchables.length - dayDiff].concat(event_3.people);
                }
                else {
                    break;
                }
            }
        }
        {
            var i = json.past.length - 1;
            var tempDate = new Date(json.past[i].date);
            var tempGroup = [];
            for (; i >= 0; i--) {
                if (isSameDate(tempDate, new Date(json.past[i].date))) {
                    tempGroup.push(new subjectGroup(json.past[i].subject, json.past[i].people));
                }
                else {
                    agenda.push(new dayList(new Date(tempDate), tempGroup));
                    tempGroup = [];
                    tempGroup.push(new subjectGroup(json.past[i].subject, json.past[i].people));
                }
                tempDate = new Date(json.past[i].date);
            }
            if (tempGroup.length > 0) {
                agenda.push(new dayList(new Date(tempDate), tempGroup));
            }
        }
        var _loop_2 = function (sub) {
            if (((_b = peopleLists.get(sub.name)) === null || _b === void 0 ? void 0 : _b.length) == 0) {
                for (var _k = 0, daySubjectList_1 = daySubjectList; _k < daySubjectList_1.length; _k++) {
                    var day_1 = daySubjectList_1[_k];
                    day_1 = day_1.filter(function (value) {
                        return value.name != sub.name;
                    });
                }
            }
        };
        for (var _h = 0, _j = json.subjects; _h < _j.length; _h++) {
            var sub = _j[_h];
            _loop_2(sub);
        }
    }
    else {
        log(json, "no json.past");
    }
}
