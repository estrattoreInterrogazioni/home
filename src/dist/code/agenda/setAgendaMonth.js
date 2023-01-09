import { isLesserDate, isSameDate } from "../compute/compute.js";
export function setAgendaMonth(num) {
    this.day = new Date(this.day.getFullYear(), this.day.getMonth() + num, 1);
    this.monthEl.innerText = this.day.toLocaleDateString("default", {
        month: "long",
        year: "numeric",
    });
    let dayIter = new Date(this.day);
    dayIter.setDate(this.day.getDate() - (this.day.getDay() - 1));
    let titles = document.getElementsByClassName("title");
    for (let i of titles) {
        i.innerText =
            dayIter.getDate().toString() +
                "\n" +
                dayIter.toLocaleDateString("default", {
                    weekday: "long",
                });
        dayIter.setDate(dayIter.getDate() + 1);
        if (dayIter.getDay() == 0) {
            dayIter.setDate(dayIter.getDate() + 1);
        }
    }
    console.log("setAgendaMonth agendaData: ", this.agendaData);
    if (this.agendaData.length != 0) {
        let stri;
        let texts = document.getElementsByClassName("text");
        for (let x of texts) {
            x.innerHTML = "";
        }
        console.log("setAgendaMonth texts: ", texts);
        dayIter.setDate(this.day.getDate() - (this.day.getDay() - 1));
        for (var i = this.agendaData.length - 1; i >= 0; i--) {
            if (isLesserDate(this.agendaData[i].day, dayIter)) {
                break;
            }
        }
        console.log("setAgendaMonth i:", i);
        let agendaDataCounter = i + 1;
        for (let j = 0; j < titles.length; j++) {
            if (isSameDate(dayIter, this.agendaData[agendaDataCounter].day)) {
                for (let sub of this.agendaData[agendaDataCounter].tests) {
                    stri =
                        `
            <div class="tag v">
              <div class="tagTitle">` +
                            sub.subject +
                            "</div>";
                    for (let person of sub.people) {
                        stri += "<div>" + person + "</div>";
                    }
                    stri += "</div>";
                    texts[j].innerHTML += stri;
                }
                agendaDataCounter += 1;
            }
            dayIter.setDate(dayIter.getDate() + 1);
            if (dayIter.getDay() == 0) {
                dayIter.setDate(dayIter.getDate() + 1);
            }
        }
    }
}
//# sourceMappingURL=setAgendaMonth.js.map