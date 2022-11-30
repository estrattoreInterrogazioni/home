var today = new Date();

var monthEl = <HTMLElement>document.getElementById("month");
var agenda = <HTMLElement>document.getElementById("agenda");
var titles = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("title");

import {createAgenda} from "./code/agenda.js";
createAgenda(agenda, titles, monthEl);