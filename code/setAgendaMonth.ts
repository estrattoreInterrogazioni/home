export function setAgendaMonth(
    num : number,
    monthEl : HTMLElement,
    titles : HTMLCollectionOf<HTMLElement>){
    
        var day = new Date();
        day = new Date(day.getFullYear(), day.getMonth()+num, 1);

        monthEl.innerText = day.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          });

        day.setDate(day.getDate() - (day.getDay() - 1));

        for(var i of titles){
            if(day.getDay() === 7) { // == domenica
                day.setDate(day.getDate()+1);
            }
            
            i.innerText = 
            day.getDate().toString() + 
            "\n" + 
            day.toLocaleDateString("default", {
                day: "numeric"
              });

            day.setDate(day.getDate()+1);
        }
}