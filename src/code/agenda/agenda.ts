import { createAgenda } from "./createAgenda.js"
import { setAgendaMonth } from "./setAgendaMonth.js"
import { setAgendaSwipeEvent } from "./monthSelector.js"
import { dayList } from "../jsonFile/jsonFileFormat.js"

export class agenda {

  protected agendaEl
  protected monthEl
  protected buttonLeft
  protected buttonRight
  day
  date
  agendaData

  constructor(
    agendaEl: HTMLElement,
    monthEl: HTMLElement,
    buttonLeft : HTMLButtonElement,
    buttonRight : HTMLButtonElement,
    date : Date,
    agendaData : dayList[] = []
  ){
    this.agendaEl = agendaEl
    this.monthEl = monthEl
    this.buttonLeft = buttonLeft
    this.buttonRight = buttonRight
    this.date = date
    this.day = this.date.getDate()
    this.date.setDate(1)
    this.agendaData = agendaData
  }

  createAgenda = createAgenda.bind(this)
  setAgendaMonth = setAgendaMonth.bind(this)
  protected setAgendaSwipeEvent = setAgendaSwipeEvent.bind(this)
}
