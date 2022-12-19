var monthEl = <HTMLElement>document.getElementById("month");
var agendaEl = <HTMLElement>document.getElementById("agenda");
var titles = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("title");
var buttonLeft = <HTMLButtonElement>document.getElementById("btnMonthBefore");
var buttonRight = <HTMLButtonElement>document.getElementById("btnMonthAfter");

var inputFile = <HTMLInputElement>document.getElementById("jsonFile");

import {agenda} from "./code/agenda/agenda.js";
import {jsonFile} from "./code/jsonFile/jsonFile.js";

var agen = new agenda(agendaEl, monthEl, titles, buttonLeft, buttonRight, new Date());
agen.createAgenda();

var file = new jsonFile(inputFile);


