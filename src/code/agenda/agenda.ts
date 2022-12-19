import { createAgenda } from "./createAgenda.js";
import { setAgendaMonth } from "./setAgendaMonth.js";
import { setAgendaSwipeEvent } from "./monthSelector.js";

export class agenda {

  protected agendaEl: HTMLElement;
  protected monthEl: HTMLElement;
  protected titles : HTMLCollectionOf<HTMLElement>;
  protected buttonLeft : HTMLButtonElement;
  protected buttonRight : HTMLButtonElement;
  protected day : Date;

  constructor(
    agendaEl: HTMLElement,
    monthEl: HTMLElement,
    titles : HTMLCollectionOf<HTMLElement>,
    buttonLeft : HTMLButtonElement,
    buttonRight : HTMLButtonElement,
    day : Date
  ){
    this.agendaEl = agendaEl;
    this.monthEl = monthEl;
    this.titles = titles;
    this.buttonLeft = buttonLeft;
    this.buttonRight = buttonRight;
    this.day = day;
  }

  createAgenda = createAgenda.bind(this);
  protected setAgendaMonth = setAgendaMonth.bind(this);
  protected setAgendaSwipeEvent = setAgendaSwipeEvent.bind(this);
}
