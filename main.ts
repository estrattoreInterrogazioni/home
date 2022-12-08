var monthEl = <HTMLElement>document.getElementById("month");
var agendaEl = <HTMLElement>document.getElementById("agenda");
var titles = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("title");
var buttonLeft = <HTMLButtonElement>document.getElementById("btnMonthBefore");
var buttonRight = <HTMLButtonElement>document.getElementById("btnMonthAfter");

import {agenda} from "./code/agenda.js";

var agen = new agenda(agendaEl, monthEl, titles, buttonLeft, buttonRight, new Date());
agen.createAgenda();