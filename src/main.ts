//mese selezionato
var monthEl = <HTMLElement>document.getElementById("month");
//bottone mese precedente
var buttonLeft = <HTMLButtonElement>document.getElementById("btnMonthBefore");
//bottone mese successivo
var buttonRight = <HTMLButtonElement>document.getElementById("btnMonthAfter");

var agendaEl = <HTMLElement>document.getElementById("agenda");

var inputFile = <HTMLInputElement>document.getElementById("jsonFile"); // input type="file"

import {agenda} from "./code/agenda/agenda.js";
import {jsonFile} from "./code/jsonFile/jsonFile.js";

let date = new Date();

var agen = new agenda(agendaEl, monthEl, buttonLeft, buttonRight, date, []);
agen.createAgenda(); //modifica il DOM, crea la struttura dell'agenda
console.log("main.ts: ", agen.agendaData)

var file = new jsonFile(inputFile, agen, date); //processa l'input poi modifica il DOM

console.log('inserire un file di input\nun esempio di file accettabile si trova nella cartella "test"')