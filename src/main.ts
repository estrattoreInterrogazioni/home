import {agenda} from "./code/agenda/agenda.js"
//import {onReaderLoad} from "./code/jsonFile/onReaderLoad.js"
import {compute} from "./code/compute/compute.js"
import {jsonFileFormat, dayList, dayListWithDateString} from "./code/jsonFile/jsonFileFormat.js"
import {getJson} from "./code/getJson/getJson.js"
import {error} from "./code/console.js"

// HTML QUERY

//mese selezionato
let monthEl = <HTMLElement>document.getElementById("month")
//bottone mese precedente
let buttonLeft = <HTMLButtonElement>document.getElementById("btnMonthBefore")
//bottone mese successivo
let buttonRight = <HTMLButtonElement>document.getElementById("btnMonthAfter")

let agendaEl = <HTMLElement>document.getElementById("agenda")

//let inputFile = <HTMLInputElement>document.getElementById("jsonFile") // input type="file"

// VARIABILI LOCALI

const showResult = false

let date = new Date()
date.setHours(0, 0, 0, 0)
if(date.getDay()==0) { //domenica
date.setDate(date.getDate()+1)
}

let agen = new agenda(agendaEl, monthEl, buttonLeft, buttonRight, new Date(date))

agen.createAgenda() //modifica il DOM, crea la struttura dell'agenda

function setRes(res : dayList[] | undefined){
    if(res){
        agen.agendaData = res
        agen.setAgendaMonth(0)
    } else {
        error(`compute result is undefined: `, res)
    }
}

function setCurrentMonth(){
    if(date.getMonth()!= agen.date.getMonth() || date.getFullYear() != agen.date.getFullYear()){
        //riporta il mese dell'agenda al mese corrente
        agen.setAgendaMonth(date.getMonth()-agen.date.getMonth() + (date.getFullYear()-agen.date.getFullYear())*12)
    }
}

function onFileInputJsonData(json : jsonFileFormat) {
    setCurrentMonth()
    setRes(compute(json, new Date(agen.date.getFullYear(), agen.date.getMonth(), agen.day, 0, 0, 0, 0)))
}

function onFileInputResultData(res : dayList[]){
    setCurrentMonth()
    setRes(res)
}


if(showResult){ //show only
    getJson("src/json/eventsShowable.json").then( res => {
        if (res) {
            res = <dayListWithDateString[]>res
            for (let x of res){
                //@ts-ignore
                x.day = new Date(x.day)
            }
            onFileInputResultData(res as unknown as dayList[])
        }
    })
} else { //compute and show
    getJson("src/json/school.json").then( res => {
        if (res) {
            onFileInputJsonData(<jsonFileFormat>res)
        }
    })
}

/*
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
*/

let pushPasswordEl = <HTMLInputElement>document.getElementById("pushPassword")
let passwordLabel = <HTMLSpanElement>document.getElementById('passwordLabel')
pushPasswordEl.onkeyup = (ev : Event) => {
    if(!(<HTMLInputElement>ev.target).checkValidity()){
        passwordLabel.innerText = 'seek and ye shall find'
    } else {
        passwordLabel.innerText = ''
    }
}

let pushButton = <HTMLButtonElement>document.getElementById("pushButton")
pushButton.onclick = () => {
    if(pushPasswordEl.checkValidity() && pushPasswordEl.value.length > 0){
        //push
    }
}