var monthEl = <HTMLElement>document.getElementById("month");
var agenda = <HTMLElement>document.getElementById("agenda");
var titles = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("title");
var buttonLeft = <HTMLButtonElement>document.getElementById("btnMonthBefore");
var buttonRight = <HTMLButtonElement>document.getElementById("btnMonthAfter");

import {createAgenda} from "./code/agenda.js";

createAgenda(agenda, monthEl, titles, buttonLeft, buttonRight);