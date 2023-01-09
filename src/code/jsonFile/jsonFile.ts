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

export class jsonFile {
    protected el;
    protected agenda;
    protected date;

    constructor(el : HTMLInputElement, agenda : agenda, date : Date){
        this.el = el;
        this.agenda = agenda;
        this.date = date;

        this.el.onchange = (ev : Event) => {
            console.log("onChangeEvent agendaData: ", this.agenda.agendaData);
            onChange(ev, this.agenda, this.date);
        };
    }
}