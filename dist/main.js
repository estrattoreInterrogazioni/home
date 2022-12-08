var monthEl = document.getElementById("month");
var agendaEl = document.getElementById("agenda");
var titles = document.getElementsByClassName("title");
var buttonLeft = document.getElementById("btnMonthBefore");
var buttonRight = document.getElementById("btnMonthAfter");
import { agenda } from "./code/agenda.js";
var agen = new agenda(agendaEl, monthEl, titles, buttonLeft, buttonRight, new Date());
agen.createAgenda();
//# sourceMappingURL=main.js.map