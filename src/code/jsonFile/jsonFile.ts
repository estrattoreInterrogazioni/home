import {compute, jsonFileFormat} from "../compute/compute.js"
import { agenda } from "../agenda/agenda.js";


function onReaderLoad(event : ProgressEvent<FileReader>){
    if(event.target){
        if(event.target.result){
            return JSON.parse(<string>event.target.result);
        }
    } else {
        console.error("event.target not present", event);
    }
}

function onChange(event : Event, agenda : agenda, date : Date) {
    var reader = new FileReader();

    reader.onload = (event : ProgressEvent<FileReader>) => {
        console.log("before onChange agendaData: ", agenda.agendaData) //qui non funziona!!!!!!!!!!!!!
        compute(<jsonFileFormat>onReaderLoad(event), date, agenda.agendaData);
        console.log("onChange agenda :", agenda);
        agenda.setAgendaMonth(0);
    };

    if(event.target){
    reader.readAsText((<FileList>(<HTMLInputElement>event.target).files)[0]);
    }
}

export class inputElWithJsonFileAttr extends HTMLInputElement {
    attriAgenda;
    attriDate;

    constructor(attriAgenda : agenda, attriDate : Date){
        super();
        this.attriAgenda = attriAgenda;
        this.attriDate = attriDate;
    }
}

export class jsonFile {
    protected el;
    protected agenda;
    protected date;

    constructor(el : inputElWithJsonFileAttr, agenda : agenda, date : Date){
        this.el = el;
        this.agenda = agenda;
        this.date = date;

        this.el.attriAgenda = this.agenda;
        this.el.attriDate = this.date;

        this.el.onchange = (ev : Event) => {
            console.log("onChangeEvent agendaData: ", (<inputElWithJsonFileAttr>ev.currentTarget).attriAgenda);
            onChange(ev, (<inputElWithJsonFileAttr>ev.currentTarget).attriAgenda, (<inputElWithJsonFileAttr>ev.currentTarget).attriDate);
        };
    }
}