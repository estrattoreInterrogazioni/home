import {agenda} from "./code/agenda/agenda.js"
import {onReaderLoad} from "./code/jsonFile/onReaderLoad.js"
import {compute} from "./code/compute/compute.js"
import { jsonFileFormat } from "./code/jsonFile/jsonFileFormat.js"

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

let agen = new agenda(agendaEl, monthEl, buttonLeft, buttonRight, date)

agen.createAgenda() //modifica il DOM, crea la struttura dell'agenda

debugger

inputFile.onchange = (event : Event) => {
    var reader = new FileReader()

    reader.onload = (event : ProgressEvent<FileReader>) => {

        let res = compute(<jsonFileFormat>onReaderLoad(event), agen.day)
        if(res){
            agen.agendaData = res
        } else {
            console.error("json file not ok")
        }

        debugger

        agen.setAgendaMonth(0)
    }

    if(event.target){
    reader.readAsText((<FileList>(<HTMLInputElement>event.target).files)[0])
    }
} //processa l'input poi modifica il DOM