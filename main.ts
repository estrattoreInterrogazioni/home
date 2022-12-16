var monthEl = <HTMLElement>document.getElementById("month");
var agendaEl = <HTMLElement>document.getElementById("agenda");
var titles = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("title");
var buttonLeft = <HTMLButtonElement>document.getElementById("btnMonthBefore");
var buttonRight = <HTMLButtonElement>document.getElementById("btnMonthAfter");

var materie = <HTMLElement>document.getElementById("materie");
var persone = <HTMLElement>document.getElementById("persone");

import {agenda} from "./code/agenda/agenda.js";
import {list} from "./code/list/list.js";

var agen = new agenda(agendaEl, monthEl, titles, buttonLeft, buttonRight, new Date());
agen.createAgenda();

var mates = new list(materie, ()=> {});
var people = new list(persone, ()=>{});

