import { agenda } from "./code/agenda/agenda.js";
import { onReaderLoad } from "./code/jsonFile/onReaderLoad.js";
import { compute } from "./code/compute/compute.js";
let monthEl = document.getElementById("month");
let buttonLeft = document.getElementById("btnMonthBefore");
let buttonRight = document.getElementById("btnMonthAfter");
let agendaEl = document.getElementById("agenda");
let inputFile = document.getElementById("jsonFile");
let date = new Date();
date.setHours(0, 0, 0, 0);
let agen = new agenda(agendaEl, monthEl, buttonLeft, buttonRight, date);
agen.createAgenda();
debugger;
inputFile.onchange = (event) => {
    var reader = new FileReader();
    reader.onload = (event) => {
        let res = compute(onReaderLoad(event), agen.day);
        if (res) {
            agen.agendaData = res;
        }
        else {
            console.error("json file not ok");
        }
        debugger;
        agen.setAgendaMonth(0);
    };
    if (event.target) {
        reader.readAsText(event.target.files[0]);
    }
};
