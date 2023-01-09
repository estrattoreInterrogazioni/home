import { compute } from "../compute/compute.js";
function onReaderLoad(event) {
    if (event.target) {
        if (event.target.result) {
            return JSON.parse(event.target.result);
        }
    }
    else {
        console.error(".target not present", event);
    }
}
function onChange(event, agenda, date) {
    var reader = new FileReader();
    reader.onload = (event) => {
        console.log("before onChange agendaData: ", agenda.agendaData);
        compute(onReaderLoad(event), date, agenda.agendaData);
        console.log("onChange agenda :", agenda);
        agenda.setAgendaMonth(0);
    };
    if (event.target) {
        reader.readAsText(event.target.files[0]);
    }
}
export class jsonFile {
    el;
    agenda;
    date;
    constructor(el, agenda, date) {
        this.el = el;
        this.agenda = agenda;
        this.date = date;
        this.el.onchange = (ev) => {
            console.log("onChangeEvent agendaData: ", this.agenda.agendaData);
            onChange(ev, this.agenda, this.date);
        };
    }
}
//# sourceMappingURL=jsonFile.js.map