import { agenda } from "./code/agenda/agenda.js";
import { onReaderLoad } from "./code/jsonFile/onReaderLoad.js";
import { compute } from "./code/compute/compute.js";
import { fetchJson } from "./code/onStart/fetchJson.js";
import { error } from "./code/console.js";
var monthEl = document.getElementById("month");
var buttonLeft = document.getElementById("btnMonthBefore");
var buttonRight = document.getElementById("btnMonthAfter");
var agendaEl = document.getElementById("agenda");
var inputFile = document.getElementById("jsonFile");
var date = new Date();
date.setHours(0, 0, 0, 0);
if (date.getDay() == 0) {
    date.setDate(date.getDate() + 1);
}
var agen = new agenda(agendaEl, monthEl, buttonLeft, buttonRight, new Date(date));
agen.createAgenda();
function onFileInput(json) {
    agen.setAgendaMonth(date.getMonth() - agen.day.getMonth());
    var res = compute(json, agen.day);
    if (res) {
        agen.agendaData = res;
    }
    else {
        error("compute result is undefined", res);
    }
    agen.setAgendaMonth(0);
}
try {
    var res = await fetchJson();
    if (res) {
        onFileInput(res);
    }
}
catch (err) {
    console.error(err);
}
inputFile.onchange = function (event) {
    var reader = new FileReader();
    reader.onloadend = function (e) {
        var res = onReaderLoad(e);
        if (res) {
            onFileInput(res);
        }
        else {
            error("onReaderLoad result is undefined", res);
        }
    };
    if (event.target) {
        reader.readAsText(event.target.files[0]);
    }
};
