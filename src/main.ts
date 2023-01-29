import {agenda} from "./code/agenda/agenda.js"
import {onReaderLoad} from "./code/jsonFile/onReaderLoad.js"
import {compute} from "./code/compute/compute.js"
import {jsonFileFormat } from "./code/jsonFile/jsonFileFormat.js"
import {getJson} from "./code/onStart/getJson.js"
import {error} from "./code/console.js"
// HTML QUERY

//mese selezionato
let monthEl = <HTMLElement>document.getElementById("month")
//bottone mese precedente
let buttonLeft = <HTMLButtonElement>document.getElementById("btnMonthBefore")
//bottone mese successivo
let buttonRight = <HTMLButtonElement>document.getElementById("btnMonthAfter")

let agendaEl = <HTMLElement>document.getElementById("agenda")

let inputFile = <HTMLInputElement>document.getElementById("jsonFile") // input type="file"

// VARIABILI LOCALI

let date = new Date()
date.setHours(0, 0, 0, 0)
if(date.getDay()==0) { //domenica
date.setDate(date.getDate()+1)
}

let agen = new agenda(agendaEl, monthEl, buttonLeft, buttonRight, new Date(date))

agen.createAgenda() //modifica il DOM, crea la struttura dell'agenda

function onFileInput(json : jsonFileFormat) {

    if(date.getMonth()!= agen.date.getMonth() || date.getFullYear() != agen.date.getFullYear()){
        //riporta il mese dell'agenda al mese corrente
        agen.setAgendaMonth(date.getMonth()-agen.date.getMonth() + (date.getFullYear()-agen.date.getFullYear())*12)
    }

    let res = compute(json, new Date(agen.date.getFullYear(), agen.date.getMonth(), agen.day, 0, 0, 0, 0))
    if(res){
        agen.agendaData = res
        agen.setAgendaMonth(0)
    } else {
        error(`compute result is undefined: `, res)
    }
}

getJson().then( res => {
    if (res) {
        onFileInput(res)
    }
})

inputFile.onchange = (event : Event) => {
    let reader = new FileReader()

    reader.onloadend = (e : ProgressEvent<FileReader>) => {
        let res = onReaderLoad(e)
        if(res){
            onFileInput(res)
        } else {
            error(`onReaderLoad result is undefined`, res)
        }
    }

    if(event.target){
        reader.readAsText((<FileList>(<HTMLInputElement>event.target).files)[0])
    }
} //processa l'input poi modifica il DOM