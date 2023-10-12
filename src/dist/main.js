import { agenda } from "./code/agenda/agenda.js";
import { compute } from "./code/compute/compute.js";
import { getJson } from "./code/getJson/getJson.js";
import { error, log } from "./code/console.js";
var monthEl = document.getElementById("month");
var buttonLeft = document.getElementById("btnMonthBefore");
var buttonRight = document.getElementById("btnMonthAfter");
var agendaEl = document.getElementById("agenda");
var buttonCompute = document.getElementById("btnCompute");
var showResult = true;
var date = new Date();
date.setHours(0, 0, 0, 0);
if (date.getDay() == 0) {
    date.setDate(date.getDate() + 1);
}
var agen = new agenda(agendaEl, monthEl, buttonLeft, buttonRight, new Date(date));
agen.createAgenda();
function setRes(res) {
    if (res) {
        if (document.getElementById("consoleLogResult").checked) {
            for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                var i = res_1[_i];
                for (var _a = 0, _b = i.tests; _a < _b.length; _a++) {
                    var j = _b[_a];
                    log(j.subject);
                    if (j.people) {
                        for (var _c = 0, _d = j.people; _c < _d.length; _c++) {
                            var person = _d[_c];
                            log(person);
                        }
                    }
                }
            }
        }
        agen.agendaData = res;
        agen.setAgendaMonth(0);
    }
    else {
        error("compute result is undefined: ", res);
    }
}
function setCurrentMonth() {
    if (date.getMonth() != agen.date.getMonth() || date.getFullYear() != agen.date.getFullYear()) {
        agen.setAgendaMonth(date.getMonth() - agen.date.getMonth() + (date.getFullYear() - agen.date.getFullYear()) * 12);
    }
}
function onFileInputJsonData(json) {
    setCurrentMonth();
    setRes(compute(json, new Date(agen.date.getFullYear(), agen.date.getMonth(), agen.day, 0, 0, 0, 0)));
}
function onFileInputResultData(res) {
    setCurrentMonth();
    setRes(res);
}
function showPreviousData() {
    getJson("src/json/eventsShowable.json").then(function (res) {
        if (res) {
            res = res;
            for (var _i = 0, res_2 = res; _i < res_2.length; _i++) {
                var x = res_2[_i];
                x.day = new Date(x.day);
            }
            onFileInputResultData(res);
        }
    });
}
function computeAndShowData() {
    getJson("src/json/school.json").then(function (res) {
        if (res) {
            onFileInputJsonData(res);
        }
    });
}
if (showResult) {
    showPreviousData();
}
else {
    computeAndShowData();
}
buttonCompute.onclick = function () {
    computeAndShowData();
};
var pushPasswordEl = document.getElementById("pushPassword");
var passwordLabel = document.getElementById('passwordLabel');
pushPasswordEl.onkeyup = function (ev) {
    if (!ev.target.checkValidity()) {
        passwordLabel.innerText = 'seek and ye shall find';
    }
    else {
        passwordLabel.innerText = '';
    }
};
var pushButton = document.getElementById("btnPush");
pushButton.onclick = function () {
    if (pushPasswordEl.checkValidity() && pushPasswordEl.value.length > 0) {
    }
};
