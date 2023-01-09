import { createAgenda } from "./createAgenda.js";
import { setAgendaMonth } from "./setAgendaMonth.js";
import { setAgendaSwipeEvent } from "./monthSelector.js";
import { dayList } from "../compute/compute.js";

export class agenda {

  protected agendaEl: HTMLElement;
  protected monthEl: HTMLElement;
  protected buttonLeft : HTMLButtonElement;
  protected buttonRight : HTMLButtonElement;
  day : Date;
  agendaData : dayList[];

  constructor(
    agendaEl: HTMLElement,
    monthEl: HTMLElement,
    buttonLeft : HTMLButtonElement,
    buttonRight : HTMLButtonElement,
    day : Date,
    agendaData : dayList[] = []
  ){
    this.agendaEl = agendaEl;
    this.monthEl = monthEl;
    this.buttonLeft = buttonLeft;
    this.buttonRight = buttonRight;
    this.day = day;
    this.agendaData = agendaData;
  }

  createAgenda = createAgenda.bind(this);
  setAgendaMonth = setAgendaMonth.bind(this);
  protected setAgendaSwipeEvent = setAgendaSwipeEvent.bind(this);
}
