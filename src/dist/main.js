import { agenda } from "./code/agenda/agenda.js";
import { compute } from "./code/compute/compute.js";
import { jsonFileFormat } from "./code/jsonFile/jsonFileFormat.js";
import { getJson } from "./code/getJson/getJson.js";
import { error } from "./code/console.js";
var monthEl = document.getElementById("month");
var buttonLeft = document.getElementById("btnMonthBefore");
var buttonRight = document.getElementById("btnMonthAfter");
var agendaEl = document.getElementById("agenda");
var showResult = false;
var date = new Date();
date.setHours(0, 0, 0, 0);
if (date.getDay() == 0) {
    date.setDate(date.getDate() + 1);
}
var agen = new agenda(agendaEl, monthEl, buttonLeft, buttonRight, new Date(date));
agen.createAgenda();
function onFileInput(json) {
    if (date.getMonth() != agen.date.getMonth() || date.getFullYear() != agen.date.getFullYear()) {
        agen.setAgendaMonth(date.getMonth() - agen.date.getMonth() + (date.getFullYear() - agen.date.getFullYear()) * 12);
    }
    var res;
    if (json instanceof jsonFileFormat) {
        res = compute(json, new Date(agen.date.getFullYear(), agen.date.getMonth(), agen.day, 0, 0, 0, 0));
    }
    else {
        res = json;
    }
    if (res) {
        agen.agendaData = res;
        agen.setAgendaMonth(0);
    }
    else {
        error("compute result is undefined: ", res);
    }
}
if (showResult) {
    getJson("src/json/eventsShowable.json").then(function (res) {
        if (res) {
            res = res;
            for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                var x = res_1[_i];
                x.day = new Date(x.day);
            }
            onFileInput(res);
        }
    });
}
else {
    getJson("src/json/school.json").then(function (res) {
        if (res) {
            onFileInput(res);
        }
    });
}
var pushPasswordEl = document.getElementById("pushPassword");
var passwordLabel = document.getElementById('passwordLabel');
pushPasswordEl.onkeyup = function (ev) {
    if (!ev.target.checkValidity()) {
        passwordLabel.innerText = 'la tua mente ottenebrata ha scambiato la verità per una menzogna';
    }
    else {
        passwordLabel.innerText = '';
    }
};
var pushButton = document.getElementById("pushButton");
pushButton.onclick = function () {
    if (pushPasswordEl.validity && pushPasswordEl.value.length > 0) {
    }
};
