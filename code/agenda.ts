import {setAgendaSwipeEvent} from "./touchEvent.js"

export function createAgenda(
    agenda : HTMLElement,
    titles : HTMLCollectionOf<HTMLElement>,
    monthEl : HTMLElement){
    var day = new Date();
    day = new Date(day.getFullYear(), day.getMonth(), 1);
    day.setDate(day.getDate()-(day.getDay()-1));
    
    monthEl.innerText = day.toLocaleDateString("default", {month: "long", year: "numeric"});

/*'<div class="h" id="agenda">'
    '<div class="v day">'
        '<div class="title">Lunedì</div>'
        '<div class="text" contenteditable>'
            '<div class="tag v">'
                '<div>Luca</div>'
                '<div>Matteo</div>'
            '</div>'
        '</div>'
    '</div>'
'</div>';*/

    var week = document.createElement("div");
    week.setAttribute("class", "h week");

    var dayEl = document.createElement("div"); //cambiare nome
    dayEl.setAttribute("class", "v day");

    var title = document.createElement("div");
    title.setAttribute("class", "title");

    var text = document.createElement("div");
    text.setAttribute("class", "text");
    text.setAttribute("contenteditable", "true");

    var tag = document.createElement("div");
    tag.setAttribute("class", "v tag");

    var tagEl = document.createElement("div");
    tagEl.innerText = "Matteo";
    tag.appendChild(tagEl);
    var tagEl2 = <HTMLElement>tagEl.cloneNode(true);
    tagEl2.innerText = "Luca";
    tag.appendChild(tagEl2);

    text.appendChild(tag);
    

    for(let i=0; i<5; i++){
        var weekOne = week.cloneNode(true);
        for(let j=0; j<7; j++){

            var titleOne = <HTMLElement>title.cloneNode(true);
            titleOne.innerText = 
            day.getDate() + "\n" + day
                .toLocaleDateString("default", {weekday: "long"});
            
            var textOne = text.cloneNode(true);
            var dayOne = dayEl.cloneNode(true);
            dayOne.appendChild(titleOne);
            dayOne.appendChild(textOne);

            weekOne.appendChild(dayOne);

            day.setDate(day.getDate()+1);
        }
        agenda.appendChild(weekOne);
    }
    setAgendaSwipeEvent(agenda, monthEl, titles);
}
