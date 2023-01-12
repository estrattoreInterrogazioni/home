import { isLesserDate, isSameDate } from "../compute/dateOp.js";
export function setAgendaMonth(num) {
    this.day.setMonth(this.day.getMonth() + num);
    let dayIter = new Date(this.day.getFullYear(), this.day.getMonth(), 1);
    this.monthEl.innerText = dayIter.toLocaleDateString("default", {
        month: "long",
        year: "numeric",
    });
    dayIter.setDate(dayIter.getDate() - (dayIter.getDay() - 1));
    let tempDay = new Date(dayIter);
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
    if (this.agendaData.length != 0) {
        let stri;
        let texts = document.getElementsByClassName("text");
        for (let x of texts) {
            x.innerHTML = "";
        }
        dayIter = tempDay;
        for (var i = this.agendaData.length - 1; i >= 0; i--) {
            if (isLesserDate(this.agendaData[i].day, dayIter)) {
                break;
            }
        }
        i += 1;
        for (let j = 0; j < titles.length; j++) {
            if (i >= this.agendaData.length) {
                break;
            }
            if (isSameDate(dayIter, this.agendaData[i].day)) {
                for (let sub of this.agendaData[i].tests) {
                    stri = `
            <div class="tag v">
              <div class="tagTitle">
                ${sub.subject}
              </div>`;
                    for (let person of sub.people) {
                        stri += `<div>${person}</div>`;
                    }
                    stri += "</div>";
                    texts[j].innerHTML += stri;
                }
                i += 1;
            }
            dayIter.setDate(dayIter.getDate() + 1);
            if (dayIter.getDay() == 0) {
                dayIter.setDate(dayIter.getDate() + 1);
            }
        }
    }
}
