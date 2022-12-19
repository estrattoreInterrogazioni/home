var monthEl = document.getElementById("month");
var agendaEl = document.getElementById("agenda");
var titles = document.getElementsByClassName("title");
var buttonLeft = document.getElementById("btnMonthBefore");
var buttonRight = document.getElementById("btnMonthAfter");
var inputFile = document.getElementById("jsonFile");
import { agenda } from "./code/agenda/agenda.js";
import { jsonFile } from "./code/jsonFile/jsonFile.js";
var agen = new agenda(agendaEl, monthEl, titles, buttonLeft, buttonRight, new Date());
agen.createAgenda();
var file = new jsonFile(inputFile);
//# sourceMappingURL=main.js.map