var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { sortPeople } from "./sortPeople.js";
export function getPeople(json) {
    var personList = [];
    var peopleLists = new Map();
    for (var i = 0; i < json.subjects.length; i++) {
        for (var _i = 0, _a = sortPeople(json); _i < _a.length; _i++) {
            var i_1 = _a[_i];
            personList.push(i_1.name);
        }
        peopleLists.set(json.subjects[i].name, personList);
        personList = [];
    }
    return peopleLists;
}
export function getDaySubjectList(json) {
    var daySubjectList = [];
    for (var i = 0; i < 6; i++) {
        daySubjectList.push([]);
    }
    for (var _i = 0, _a = json.subjects; _i < _a.length; _i++) {
        var sub = _a[_i];
        for (var _b = 0, _c = sub.days; _b < _c.length; _b++) {
            var i = _c[_b];
            daySubjectList[i - 1].push(__assign({}, sub));
        }
    }
    return daySubjectList;
}
