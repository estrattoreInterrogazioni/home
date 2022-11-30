var today = new Date();
var monthEl = document.getElementById("month");
var agenda = document.getElementById("agenda");
var titles = document.getElementsByClassName("title");
import { createAgenda } from "./code/agenda.js";
createAgenda(agenda, titles, monthEl);
//# sourceMappingURL=main.js.map