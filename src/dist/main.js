var monthEl = document.getElementById("month");
var buttonLeft = document.getElementById("btnMonthBefore");
var buttonRight = document.getElementById("btnMonthAfter");
var agendaEl = document.getElementById("agenda");
var inputFile = document.getElementById("jsonFile");
import { agenda } from "./code/agenda/agenda.js";
import { jsonFile } from "./code/jsonFile/jsonFile.js";
let date = new Date();
var agen = new agenda(agendaEl, monthEl, buttonLeft, buttonRight, date, []);
agen.createAgenda();
console.log("main.ts: ", agen.agendaData);
var file = new jsonFile(inputFile, agen, date);
console.log('inserire un file di input\nun esempio di file accettabile si trova nella cartella "test"');
//# sourceMappingURL=main.js.map