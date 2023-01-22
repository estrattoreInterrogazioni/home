var person = (function () {
    function person(name, score) {
        this.name = name;
        this.score = score;
    }
    return person;
}());
export { person };
var subject = (function () {
    function subject(name, number, days) {
        this.name = name;
        this.number = number;
        this.days = days;
    }
    return subject;
}());
export { subject };
var past = (function () {
    function past(subject, people, date) {
        this.subject = subject;
        this.people = people;
        this.date = date;
    }
    return past;
}());
var jsonFileFormat = (function () {
    function jsonFileFormat(planFor, waitTime, people, subjects, past) {
        this.planFor = planFor;
        this.waitTime = waitTime;
        this.people = people;
        this.subjects = subjects;
        this.past = past;
    }
    return jsonFileFormat;
}());
export { jsonFileFormat };
var subjectGroup = (function () {
    function subjectGroup(subject, people) {
        this.subject = subject;
        this.people = people;
    }
    return subjectGroup;
}());
export { subjectGroup };
var dayList = (function () {
    function dayList(day, tests) {
        this.day = day;
        this.tests = tests;
    }
    return dayList;
}());
export { dayList };
